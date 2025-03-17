import * as rrweb from 'rrweb';
import type { eventWithTime, blockClass, maskTextClass } from '@rrweb/types';

export interface ClickstreamConfig {
  samplingRate?: number;
  blockClass?: blockClass;
  blockSelector?: string;
  maskAllInputs?: boolean;
  maskTextClass?: maskTextClass;
  maskTextSelector?: string;
}

export interface Event {
  timestamp: number;
  type: 'click' | 'mousemove' | 'scroll' | 'input' | 'view';
  target?: string;
  data?: unknown; // replace with eventWithTime | eventWithoutTime
  sessionId: string;
}

export class ClickstreamTracker {
  private events: Event[] = [];
  private sessionId: string;
  private stopFn?: () => void;
  private config: ClickstreamConfig;

  constructor(config: ClickstreamConfig = {}) {
    this.sessionId = this.generateSessionId();
    this.config = {
      samplingRate: 1,
      maskAllInputs: true,
      ...config,
    };
  }

  public start(): void {
    if (this.stopFn) {
      return;
    }

    this.stopFn = rrweb.record({
      emit: (event: eventWithTime) => {
        if (event.type === 2) { // Full snapshot
          return;
        }

        const clickstreamEvent: Event = {
          timestamp: event.timestamp,
          type: this.mapEventType(event.type),
          target: this.getEventTarget(event),
          data: event.data as unknown,
          sessionId: this.sessionId,
        };

        this.events.push(clickstreamEvent);
      },
      sampling: {
        mousemove: this.config.samplingRate,
        scroll: this.config.samplingRate,
      },
      blockClass: this.config.blockClass,
      blockSelector: this.config.blockSelector,
      maskAllInputs: this.config.maskAllInputs,
      maskTextClass: this.config.maskTextClass,
      maskTextSelector: this.config.maskTextSelector,
    });
  }

  public stop(): void {
    if (this.stopFn) {
      this.stopFn();
      this.stopFn = undefined;
    }
  }

  public getEvents(): Event[] {
    return [...this.events];
  }

  public clearEvents(): void {
    this.events = [];
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  private mapEventType(rrwebType: number): Event['type'] {
    switch (rrwebType) {
      case 3: // Mouse movement
        return 'mousemove';
      case 4: // Scroll
        return 'scroll';
      case 5: // Viewport resize
        return 'view';
      case 6: // Input
        return 'input';
      case 7: // Click
        return 'click';
      default:
        return 'click';
    }
  }

  private getEventTarget(event: eventWithTime): string | undefined {
    if (!event.data || typeof event.data !== 'object') {
      return undefined;
    }

    const data = event.data as Record<string, unknown>;
    return (data.target as string) || undefined;
  }

  private generateSessionId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
} 