// Mock rrweb's record function
jest.mock('rrweb', () => ({
  record: ({ emit }) => {
    // Create event handler function
    const handleClick = (event) => {
      emit({
        type: 7, // Click event type
        timestamp: Date.now(),
        data: {
          target: event.target?.nodeName?.toLowerCase() || 'unknown',
        },
      });
    };

    // Add event listener
    document.addEventListener('click', handleClick);

    // Return cleanup function
    return () => {
      document.removeEventListener('click', handleClick);
    };
  },
})); 