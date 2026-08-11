import { NextResponse } from 'next/server';

// ─── Standard Success Response ─────────────────────────────────────
export function apiSuccess<T>(data: T, message = 'Operation successful', status = 200) {
  return NextResponse.json(
    { success: true, data, message },
    { status },
  );
}

// ─── Standard Error Response ───────────────────────────────────────
export function apiError(
  code: string,
  message: string,
  status = 400,
  details?: Record<string, unknown>,
) {
  return NextResponse.json(
    {
      success: false,
      error: { code, message, details: details || {} },
    },
    { status },
  );
}

// ─── Paginated Response ────────────────────────────────────────────
export function apiPaginated<T>(
  data: T[],
  page: number,
  limit: number,
  total: number,
  message = 'Data retrieved',
) {
  return NextResponse.json(
    {
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: page * limit < total,
      },
      message,
    },
    { status: 200 },
  );
}

// ─── Parse Pagination from URL ─────────────────────────────────────
export function parsePagination(searchParams: URLSearchParams) {
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '25', 10)));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}
