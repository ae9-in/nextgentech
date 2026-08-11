// Structured Backend Logging Utility

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, unknown>;
  durationMs?: number;
}

export function log(level: LogLevel, message: string, context?: Record<string, unknown>, durationMs?: number) {
  const entry: LogEntry = {
    level,
    message,
    timestamp: new Date().toISOString(),
    context,
    durationMs,
  };

  const formatted = `[${entry.timestamp}] [${level.toUpperCase()}] ${message}${durationMs ? ` (${durationMs}ms)` : ''}`;

  if (level === 'error') {
    console.error(formatted, context || '');
  } else if (level === 'warn') {
    console.warn(formatted, context || '');
  } else {
    console.log(formatted, context || '');
  }

  // Flag slow operations taking > 500ms
  if (durationMs && durationMs > 500) {
    console.warn(`⚠️ [SLOW ENDPOINT DETECTED] ${message} took ${durationMs}ms`);
  }
}
