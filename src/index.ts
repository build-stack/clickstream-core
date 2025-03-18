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

export interface ClickstreamEvent {
  timestamp: number;
  type: 'click' | 'mousemove' | 'scroll' | 'input' | 'view' | 'unknown';
  target?: string;
  data?: Record<string, unknown>;
  sessionId: string;
}

export class ClickstreamTracker {
  private events: ClickstreamEvent[] = [];
  private sessionId: string;
  private stopFn?: () => void;
  private config: ClickstreamConfig;
  private isRecording: boolean = false;

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

    this.isRecording = true;
    this.stopFn = rrweb.record({
      emit: (event: eventWithTime) => {
        // todo(1): check if we need not to record full snapshot.
        if (!this.isRecording || event.type === 2) { // Don't record if stopped or if it's a full snapshot
          return;
        }

        const clickstreamEvent: ClickstreamEvent = {
          timestamp: event.timestamp,
          type: this.mapEventType(event.type),
          target: this.getEventTarget(event),
          data: event.data as Record<string, unknown>,
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
    this.isRecording = false;
    if (this.stopFn) {
      this.stopFn();
      this.stopFn = undefined;
    }
  }

  public getEvents(): ClickstreamEvent[] {
    return [...this.events];
  }

  public clearEvents(): void {
    this.events = [];
  }

  public getSessionId(): string {
    return this.sessionId;
  }

  private mapEventType(rrwebType: number): ClickstreamEvent['type'] {
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
        console.warn(`Unknown rrweb event type: ${rrwebType}`);
        return 'unknown';
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
