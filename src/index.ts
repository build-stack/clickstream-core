import * as rrweb from "rrweb";
import { compress } from 'lz-string';
import type { eventWithTime, blockClass, maskTextClass } from "@rrweb/types";

export interface ClickstreamConfig {
  samplingRate?: number;
  blockClass?: blockClass;
  blockSelector?: string;
  maskAllInputs?: boolean;
  maskTextClass?: maskTextClass;
  maskTextSelector?: string;
  remoteEndpoint?: string;
  maxEvents?: number;
  environmentId?: string;
}

type AnnotatedEvent = eventWithTime & {
  sessionId: string;
  environmentId?: string;
};

/**
 * A class that tracks user interactions and creates a clickstream of events
 * using the rrweb library for recording browser events.
 */
export class Clickstream {
  private events: SessionStorageList<eventWithTime>;
  private sessionId: string;
  private stopFn?: () => void;
  private config: ClickstreamConfig;
  private isRecording: boolean = false;

  /**
   * Creates a new instance of ClickstreamTracker.
   * @param config - Configuration options for the tracker
   */
  constructor(config: ClickstreamConfig = {}) {
    this.sessionId = this.getOrCreateSessionId();
    this.config = {
      samplingRate: 1,
      maskAllInputs: true,
      maxEvents: 10,
      environmentId: window.location.hostname, // Default to current hostname
      ...config,
    };
    this.events = new SessionStorageList('clickstream-events', this.config.maxEvents);
  }

  /**
   * Starts recording user interactions. If recording is already in progress,
   * this method will have no effect. The recording will continue until stop()
   * is called.
   */
  public start(): void {
    if (this.stopFn || this.isRecording) {
      return;
    }

    console.log('🎬 Starting Clickstream');

    this.isRecording = true;

    this.stopFn = rrweb.record({
      emit: (event: eventWithTime) => {
        if (!this.isRecording) {
          return;
        }

        if (this.events.length >= this.config.maxEvents!) {
          // flush events to remote.
          this.flushEvents();
          this.events.clear();
        }

        this.events.push(event);
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

  /**
   * Stops the current recording session. After stopping, no new events will be
   * recorded until start() is called again.
   */
  public stop(): void {
    this.isRecording = false;
    if (this.stopFn) {
      this.stopFn();
      this.stopFn = undefined;
    }
  }

  /**
   * Removes all recorded events from memory. This does not stop the recording
   * if it is in progress.
   */
  public clearEvents(): void {
    this.events.clear();
  }

  /**
   * Returns all recorded events.
   * @returns Array of all recorded events
   */
  public getEvents(): eventWithTime[] {
    return this.events.getAll();
  }

  /**
   * Returns the current session identifier.
   * @returns The unique session ID for the current recording session
   */
  public getSessionId(): string {
    return this.sessionId;
  }

  /**
   * Flushes the events to the remote server.
   */
  public flushEvents(): void {
    if (this.config.remoteEndpoint) {
      const events = this.events.getAll()
      this.events.clear();

      fetch(this.config.remoteEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Clickstream-Environment-Id': this.config.environmentId || '',
          'X-Clickstream-Session-Id': this.sessionId || '',
        },
        body: JSON.stringify({
          events: events.map(_ => compress(JSON.stringify(_))),
        }),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Events successfully sent to remote endpoint', data);
      })
      .catch(error => {
        console.error('Error sending events to remote endpoint:', error);
      });
    }
  }

  /**
   * Gets an existing sessionId from sessionStorage or creates a new one if none exists.
   * @returns The session identifier
   * @private
   */
  private getOrCreateSessionId(): string {
    const storageKey = 'clickstream-session-id';
    
    // Try to get existing sessionId from sessionStorage
    try {
      const existingId = sessionStorage.getItem(storageKey);
      if (existingId) {
        return existingId;
      }
    } catch (error) {
      console.error('Error reading sessionId from sessionStorage:', error);
    }
    
    // Generate a new sessionId if none exists
    const newId = this.generateSessionId();
    
    // Store the new sessionId in sessionStorage
    try {
      sessionStorage.setItem(storageKey, newId);
    } catch (error) {
      console.error('Error saving sessionId to sessionStorage:', error);
    }
    
    return newId;
  }

  /**
   * Generates a unique session identifier combining a random string and timestamp.
   * @returns A unique session identifier
   * @private
   */
  private generateSessionId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}

/**
 * A class that extends Array functionality and persists data to sessionStorage.
 * Data will be automatically cleared when the browser is closed.
 */
export class SessionStorageList<T> {
  private key: string;
  private items: T[] = [];
  private maxItems: number | undefined;

  /**
   * Creates a new SessionStorageList
   * @param storageKey - The key to use for storing in sessionStorage
   * @param maxItems - Optional maximum number of items to keep (newest items are preserved)
   */
  constructor(storageKey: string, maxItems = 9999) {
    this.key = storageKey;
    this.maxItems = maxItems;
  }

  /**
   * Adds an item to the beginning of the list and updates storage
   * @param item - The item to add
   */
  public push(item: T): void {
    if (this.maxItems && this.items.length >= this.maxItems) {
      this.items.shift();
    }

    this.items.push(item);
    this.saveToStorage();
  }

  /**
   * Adds an item to the beginning of the list and updates storage
   * @param item - The item to add
   */
  public unshift(item: T): void {
    this.items.unshift(item);
    this.saveToStorage();
  }

  /**
   * Removes the last item from the list and updates storage
   * @returns The removed item or undefined if list is empty
   */
  public pop(): T | undefined {
    if (this.items.length === 0) {
      return undefined;
    }
    const item = this.items.pop();
    this.saveToStorage();
    return item;
  }

  /**
   * Removes the first item from the list and updates storage
   * @returns The removed item or undefined if list is empty
   */
  public shift(): T | undefined {
    if (this.items.length === 0) {
      return undefined;
    }
    const item = this.items.shift();
    this.saveToStorage();
    return item;
  }

  /**
   * Removes all items from the list and clears storage
   */
  public clear(): void {
    this.items = [];
    this.saveToStorage();
  }

  /**
   * Returns all items in the list
   * @returns Array of all items
   */
  public getAll(): T[] {
    return [...this.items];
  }

  /**
   * Returns the number of items in the list
   * @returns The item count
   */
  public get length(): number {
    return this.items.length;
  }

  /**
   * Returns an item at the specified index
   * @param index - The index to retrieve
   * @returns The item at the specified index or undefined
   */
  public get(index: number): T | undefined {
    return this.items[index];
  }

  /**
   * Saves items to sessionStorage
   * @private
   */
  private saveToStorage(): void {
    try {
      sessionStorage.setItem(this.key, JSON.stringify(this.items));
    } catch (error) {
      console.error('Error saving to sessionStorage:', error);
    }
  }
}

export default Clickstream;
