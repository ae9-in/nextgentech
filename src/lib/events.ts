import { EventEmitter } from 'events';

class RealtimeEventBus extends EventEmitter {
  private static instance: RealtimeEventBus;

  private constructor() {
    super();
    this.setMaxListeners(100);
  }

  public static getInstance(): RealtimeEventBus {
    if (!RealtimeEventBus.instance) {
      RealtimeEventBus.instance = new RealtimeEventBus();
    }
    return RealtimeEventBus.instance;
  }

  public emitUserEvent(userId: string, eventType: string, payload: any) {
    this.emit(`user:${userId}`, { type: eventType, payload, timestamp: new Date().toISOString() });
  }

  public emitRoleEvent(role: string, eventType: string, payload: any) {
    this.emit(`role:${role}`, { type: eventType, payload, timestamp: new Date().toISOString() });
  }

  public emitGlobalEvent(eventType: string, payload: any) {
    this.emit('global', { type: eventType, payload, timestamp: new Date().toISOString() });
  }
}

export const eventBus = RealtimeEventBus.getInstance();
