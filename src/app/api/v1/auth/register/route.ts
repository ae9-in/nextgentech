import { NextRequest } from 'next/server';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { generateTokens, storeRefreshToken } from '@/lib/auth';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';
import { registerSchema, validateBody } from '@/lib/validate';
import { createAuditLog, AUDIT_ACTIONS } from '@/lib/audit';
import { ZodError } from 'zod';
export const dynamic = 'force-dynamic';
export const revalidate = 0;


export async function POST(request: NextRequest) {
  try {
    const body = await validateBody(request, registerSchema);

    const users = await getCollection(COLLECTIONS.USERS);

    // Check duplicate email
    const existing = await users.findOne({ email: body.email });
    if (existing) {
      return apiError('CONFLICT', 'An account with this email already exists', 409);
    }

    // Hash password
    const hashedPassword = await hashPassword(body.password);

    // Create user
    const now = new Date();
    const newUser = {
      name: body.name,
      email: body.email,
      password: hashedPassword,
      role: body.role || 'STUDENT',
      status: 'ACTIVE',
      college: body.college || '',
      phone: body.phone || '',
      track: body.track || 'Full Stack Development',
      xp: 0,
      streak: 0,
      level: 1,
      enrolledCoursesCount: 0,
      weeklyHours: 0,
      aggregateScore: 0,
      createdAt: now,
      updatedAt: now,
    };

    const result = await users.insertOne(newUser);
    const userId = result.insertedId.toString();

    // Generate tokens
    const tokenPayload = {
      userId,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
    };
    const tokens = generateTokens(tokenPayload);
    await storeRefreshToken(userId, tokens.refreshToken);

    // Audit log
    await createAuditLog({
      actor: userId,
      actorRole: newUser.role,
      actorName: newUser.name,
      action: AUDIT_ACTIONS.USER_REGISTERED,
      entity: 'user',
      entityId: userId,
      metadata: { email: newUser.email, role: newUser.role },
    });

    // Return user (without password) + tokens
    const { password: _, ...userWithoutPassword } = newUser;
    return apiSuccess(
      {
        user: { ...userWithoutPassword, _id: userId },
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
      'Registration successful',
      201,
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError('VALIDATION_ERROR', 'Invalid registration data', 400, {
        fields: error.issues.map((e: any) => ({ path: e.path.join('.'), message: e.message })),
      });
    }
    return handleApiError(error);
  }
}
