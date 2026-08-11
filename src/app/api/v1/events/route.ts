import { NextRequest } from 'next/server';
import { authenticateRequest } from '@/lib/auth';
import { eventBus } from '@/lib/events';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  let authUser: any = null;
  try {
    authUser = await authenticateRequest(request);
  } catch {
    return new Response('Unauthorized', { status: 401 });
  }

  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();

      const sendEvent = (data: any) => {
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch {}
      };

      // Listener for direct user events
      const userChannel = `user:${authUser.userId}`;
      const roleChannel = `role:${authUser.role}`;

      const userHandler = (data: any) => sendEvent(data);
      const roleHandler = (data: any) => sendEvent(data);
      const globalHandler = (data: any) => sendEvent(data);

      eventBus.on(userChannel, userHandler);
      eventBus.on(roleChannel, roleHandler);
      eventBus.on('global', globalHandler);

      // Heartbeat every 15s to keep connection active
      const keepAlive = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(': keep-alive\n\n'));
        } catch {}
      }, 15000);

      request.signal.addEventListener('abort', () => {
        clearInterval(keepAlive);
        eventBus.off(userChannel, userHandler);
        eventBus.off(roleChannel, roleHandler);
        eventBus.off('global', globalHandler);
      });
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
    },
  });
}
