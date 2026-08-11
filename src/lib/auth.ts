import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';
import { getCollection, COLLECTIONS } from './db';
import { AuthError, ForbiddenError } from './errors';

const JWT_SECRET = process.env.JWT_SECRET || 'nxtgen-tech-jwt-secret-2026-production';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'nxtgen-tech-refresh-secret-2026-production';
const ACCESS_TOKEN_EXPIRY = '15m';
const REFRESH_TOKEN_EXPIRY = '7d';
const SALT_ROUNDS = 12;

// ─── Types ─────────────────────────────────────────────────────────
export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  name: string;
}

export interface AuthUser {
  userId: string;
  email: string;
  role: string;
  name: string;
}

// ─── Password Hashing ──────────────────────────────────────────────
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// ─── JWT Token Generation ──────────────────────────────────────────
export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
}

export function generateRefreshToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
}

export function generateTokens(payload: TokenPayload) {
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
}

// ─── JWT Verification ──────────────────────────────────────────────
export function verifyAccessToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    throw new AuthError('Invalid or expired access token');
  }
}

export function verifyRefreshToken(token: string): TokenPayload {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as TokenPayload;
  } catch {
    throw new AuthError('Invalid or expired refresh token');
  }
}

// ─── Extract Token from Request ────────────────────────────────────
function extractToken(request: NextRequest): string | null {
  // Check Authorization header first
  const authHeader = request.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  // Check cookies as fallback
  const cookieToken = request.cookies.get('access_token')?.value;
  if (cookieToken) return cookieToken;

  return null;
}

// ─── Auth Middleware ───────────────────────────────────────────────
export async function authenticateRequest(request: NextRequest): Promise<AuthUser> {
  const token = extractToken(request);
  if (!token) {
    throw new AuthError('No authentication token provided');
  }

  const payload = verifyAccessToken(token);
  return {
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
    name: payload.name,
  };
}

// ─── Role Check ────────────────────────────────────────────────────
export function requireRole(user: AuthUser, ...allowedRoles: string[]): void {
  if (!allowedRoles.includes(user.role)) {
    throw new ForbiddenError(
      `Role '${user.role}' does not have access. Required: ${allowedRoles.join(', ')}`,
    );
  }
}

// ─── Store Refresh Token in DB ─────────────────────────────────────
export async function storeRefreshToken(
  userId: string,
  refreshToken: string,
): Promise<void> {
  const col = await getCollection(COLLECTIONS.REFRESH_TOKENS);
  await col.updateOne(
    { userId },
    {
      $set: {
        userId,
        token: refreshToken,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    },
    { upsert: true },
  );
}

// ─── Revoke Refresh Token ──────────────────────────────────────────
export async function revokeRefreshToken(userId: string): Promise<void> {
  const col = await getCollection(COLLECTIONS.REFRESH_TOKENS);
  await col.deleteMany({ userId });
}

// ─── Validate Stored Refresh Token ─────────────────────────────────
export async function validateStoredRefreshToken(
  userId: string,
  token: string,
): Promise<boolean> {
  const col = await getCollection(COLLECTIONS.REFRESH_TOKENS);
  const stored = await col.findOne({ userId, token });
  if (!stored) return false;
  if (stored.expiresAt < new Date()) {
    await col.deleteOne({ _id: stored._id });
    return false;
  }
  return true;
}
