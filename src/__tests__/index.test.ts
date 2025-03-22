import { ClickstreamTracker } from "../index";

jest.mock("rrweb", () => {
  const mockRecord = jest.fn().mockImplementation(({ emit }): (() => void) => {
    const emitRef = { current: emit };
    return (): void => {
      emitRef.current = (): void => {}; // No-op after stopping
    };
  });
  return { record: mockRecord };
});

describe("ClickstreamTracker", () => {
  let tracker: ClickstreamTracker;
  let mockRecord: jest.Mock;

  beforeEach(() => {
    tracker = new ClickstreamTracker();
    mockRecord = (jest.requireMock("rrweb") as { record: jest.Mock }).record;
    mockRecord.mockClear();
  });

  afterEach(() => {
    tracker.stop();
    jest.clearAllMocks();
  });

  it("should initialize with a session ID", () => {
    expect(tracker.getSessionId()).toBeDefined();
    expect(typeof tracker.getSessionId()).toBe("string");
    expect(tracker.getSessionId().length).toBeGreaterThan(0);
  });

  it("should start recording events", async () => {
    tracker.start();

    // Get the emit function from the mock
    const emit = mockRecord.mock.calls[0][0].emit;

    // Simulate a click event
    emit({
      type: 7,
      timestamp: Date.now(),
      data: {
        target: "button",
      },
    });

    const events = tracker.getEvents();
    expect(events.length).toBe(1);
    expect(events[0].type).toBe("click");
  });

  it("should stop recording events", async () => {
    tracker.start();
    const emit = mockRecord.mock.calls[0][0].emit;

    // Record an event before stopping
    emit({
      type: 7,
      timestamp: Date.now(),
      data: {
        target: "button",
      },
    });

    tracker.stop();

    // Try to record another event after stopping
    emit({
      type: 7,
      timestamp: Date.now(),
      data: {
        target: "button",
      },
    });

    const events = tracker.getEvents();
    expect(events.length).toBe(1); // Should only have the first event
  });

  it("should clear events", async () => {
    tracker.start();

    // Get the emit function from the mock
    const emit = mockRecord.mock.calls[0][0].emit;

    // Simulate a click event
    emit({
      type: 7,
      timestamp: Date.now(),
      data: {
        target: "button",
      },
    });

    tracker.clearEvents();
    const events = tracker.getEvents();
    expect(events.length).toBe(0);
  });

  it("should respect configuration options", () => {
    const config = {
      samplingRate: 0.5,
      maskAllInputs: true,
      blockClass: /no-track/,
      blockSelector: ".private",
    };

    tracker = new ClickstreamTracker(config);
    tracker.start();

    expect(mockRecord).toHaveBeenCalledWith(
      expect.objectContaining({
        sampling: {
          mousemove: 0.5,
          scroll: 0.5,
        },
        blockClass: /no-track/,
        blockSelector: ".private",
        maskAllInputs: true,
      }),
    );
  });

  it("should handle unknown event types", () => {
    tracker.start();

    // Get the emit function from the mock
    const emit = mockRecord.mock.calls[0][0].emit;

    // Simulate an unknown event type
    emit({
      type: 999, // Unknown event type
      timestamp: Date.now(),
      data: {
        target: "test",
      },
    });

    const events = tracker.getEvents();
    expect(events.length).toBe(1);
    expect(events[0].type).toBe("unknown");
  });
});
