import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
export const dynamic = 'force-dynamic';
export const revalidate = 0;


export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('nxtgentech');
    const ping = await db.command({ ping: 1 });

    return NextResponse.json({
      status: 'connected',
      database: 'nxtgentech',
      ping: ping,
      cluster: 'clusternxtgen.ihza2b4.mongodb.net',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { status: 'error', message: error.message },
      { status: 500 }
    );
  }
}
