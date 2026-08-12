import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
export const dynamic = 'force-dynamic';
export const revalidate = 0;


export async function GET() {
  const startTime = Date.now();
  try {
    const client = await clientPromise;
    const db = client.db('nxtgentech');
    const ping = await db.command({ ping: 1 });
    const latency = Date.now() - startTime;

    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      ping,
      latencyMs: latency,
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: 'unhealthy', database: 'disconnected', error: error.message },
      { status: 500 }
    );
  }
}
