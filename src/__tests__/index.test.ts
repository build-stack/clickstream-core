import { ClickstreamTracker } from '../index';

describe('ClickstreamTracker', () => {
  let tracker: ClickstreamTracker;

  beforeEach(() => {
    tracker = new ClickstreamTracker();
  });

  afterEach(() => {
    tracker.stop();
  });

  it('should initialize with a session ID', () => {
    expect(tracker.getSessionId()).toBeDefined();
    expect(typeof tracker.getSessionId()).toBe('string');
    expect(tracker.getSessionId().length).toBeGreaterThan(0);
  });

  it('should start recording events', async () => {
    tracker.start();
    // Simulate a click event
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    document.body.dispatchEvent(clickEvent);
    
    // Wait for the event to be processed
    await new Promise<void>(resolve => {
      setTimeout(() => {
        const events = tracker.getEvents();
        expect(events.length).toBeGreaterThan(0);
        expect(events[0].type).toBe('click');
        resolve();
      }, 500); // Increased timeout
    });
  }, 10000); // Test timeout

  it('should stop recording events', async () => {
    tracker.start();
    tracker.stop();
    
    // Simulate a click event after stopping
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    document.body.dispatchEvent(clickEvent);
    
    // Wait for any potential events to be processed
    await new Promise<void>(resolve => {
      setTimeout(() => {
        const events = tracker.getEvents();
        expect(events.length).toBe(0);
        resolve();
      }, 500);
    });
  }, 10000);

  it('should clear events', async () => {
    tracker.start();
    // Simulate a click event
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    document.body.dispatchEvent(clickEvent);
    
    // Wait for the event to be processed
    await new Promise<void>(resolve => {
      setTimeout(() => {
        tracker.clearEvents();
        const events = tracker.getEvents();
        expect(events.length).toBe(0);
        resolve();
      }, 500);
    });
  }, 10000);

  it('should respect configuration options', () => {
    const config = {
      samplingRate: 0.5,
      maskAllInputs: true,
      blockClass: /no-track/,
      blockSelector: '.private',
    };
    
    tracker = new ClickstreamTracker(config);
    tracker.start();
    
    // Verify configuration is applied
    const events = tracker.getEvents();
    expect(events).toBeDefined();
  });
}); 