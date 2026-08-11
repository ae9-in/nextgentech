import { NextRequest } from 'next/server';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { verifyPassword, generateTokens, storeRefreshToken } from '@/lib/auth';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';
import { loginSchema, validateBody } from '@/lib/validate';
import { createAuditLog, AUDIT_ACTIONS } from '@/lib/audit';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await validateBody(request, loginSchema);

    const users = await getCollection(COLLECTIONS.USERS);
    const user = await users.findOne({ email: body.email });

    if (!user) {
      return apiError('AUTH_ERROR', 'Invalid email or password', 401);
    }

    if (user.status === 'SUSPENDED') {
      return apiError('AUTH_ERROR', 'Your account has been suspended. Contact admin.', 403);
    }

    // Verify password
    const isValid = await verifyPassword(body.password, user.password);
    if (!isValid) {
      return apiError('AUTH_ERROR', 'Invalid email or password', 401);
    }

    // Generate tokens
    const userId = user._id.toString();
    const tokenPayload = {
      userId,
      email: user.email,
      role: user.role,
      name: user.name,
    };
    const tokens = generateTokens(tokenPayload);
    await storeRefreshToken(userId, tokens.refreshToken);

    // Update last login
    await users.updateOne(
      { _id: user._id },
      { $set: { lastLoginAt: new Date() } },
    );

    // Audit log
    await createAuditLog({
      actor: userId,
      actorRole: user.role,
      actorName: user.name,
      action: AUDIT_ACTIONS.USER_LOGGED_IN,
      entity: 'user',
      entityId: userId,
    });

    // Return user (without password) + tokens
    const { password: _, ...userWithoutPassword } = user;
    return apiSuccess({
      user: { ...userWithoutPassword, _id: userId },
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }, 'Login successful');
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError('VALIDATION_ERROR', 'Invalid login data', 400, {
        fields: error.issues.map((e: any) => ({ path: e.path.join('.'), message: e.message })),
      });
    }
    return handleApiError(error);
  }
}
