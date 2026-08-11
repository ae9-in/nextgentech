// ─── Custom Error Classes ──────────────────────────────────────────

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly details: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: number,
    code: string,
    details: Record<string, unknown> = {},
  ) {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details: Record<string, unknown> = {}) {
    super(message, 400, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
  }
}

export class AuthError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401, 'AUTH_ERROR');
    this.name = 'AuthError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'You do not have permission to perform this action') {
    super(message, 403, 'FORBIDDEN');
    this.name = 'ForbiddenError';
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Resource already exists') {
    super(message, 409, 'CONFLICT');
    this.name = 'ConflictError';
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Too many requests. Please try again later.') {
    super(message, 429, 'RATE_LIMIT');
    this.name = 'RateLimitError';
  }
}

// ─── Error Handler for API Routes ──────────────────────────────────
import { apiError } from './apiResponse';

export function handleApiError(error: unknown) {
  console.error('[API Error]', error);

  if (error instanceof AppError) {
    return apiError(error.code, error.message, error.statusCode, error.details);
  }

  if (error instanceof Error) {
    // Never expose internal error details in production
    const message =
      process.env.NODE_ENV === 'development'
        ? error.message
        : 'An internal server error occurred';
    return apiError('INTERNAL_ERROR', message, 500);
  }

  return apiError('INTERNAL_ERROR', 'An unexpected error occurred', 500);
}
