import { NextRequest } from 'next/server';
import { getCollection, COLLECTIONS } from '@/lib/db';
import { verifyRefreshToken, generateTokens, storeRefreshToken, validateStoredRefreshToken } from '@/lib/auth';
import { apiSuccess, apiError } from '@/lib/apiResponse';
import { handleApiError } from '@/lib/errors';
import { refreshTokenSchema, validateBody } from '@/lib/validate';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
  try {
    const body = await validateBody(request, refreshTokenSchema);

    // Verify the refresh token JWT
    const payload = verifyRefreshToken(body.refreshToken);

    // Validate it's stored in DB (not revoked)
    const isValid = await validateStoredRefreshToken(payload.userId, body.refreshToken);
    if (!isValid) {
      return apiError('AUTH_ERROR', 'Refresh token has been revoked or expired', 401);
    }

    // Check user still exists and is active
    const users = await getCollection(COLLECTIONS.USERS);
    const { ObjectId } = await import('mongodb');
    const user = await users.findOne({ _id: new ObjectId(payload.userId) });
    if (!user || user.status === 'SUSPENDED') {
      return apiError('AUTH_ERROR', 'Account not found or suspended', 401);
    }

    // Generate new tokens
    const newPayload = {
      userId: payload.userId,
      email: user.email,
      role: user.role,
      name: user.name,
    };
    const tokens = generateTokens(newPayload);
    await storeRefreshToken(payload.userId, tokens.refreshToken);

    return apiSuccess({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }, 'Token refreshed successfully');
  } catch (error) {
    if (error instanceof ZodError) {
      return apiError('VALIDATION_ERROR', 'Invalid request', 400);
    }
    return handleApiError(error);
  }
}
