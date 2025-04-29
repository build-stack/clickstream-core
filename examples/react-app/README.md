# Clickstream Tracker React Example

This is a React application demonstrating how to integrate and use the Clickstream Tracker library in a modern single-page application with React Router for navigation.

## Features

- React Router v6 for client-side navigation
- Tailwind CSS for styling
- Integration with Clickstream Tracker for user interaction tracking
- Form handling with tracking
- Persistent session tracking
- Multiple page examples with different interaction patterns

## Getting Started

### Prerequisites

Make sure you have Node.js (v14+) and npm installed on your system.

### Installation

1. Build the main Clickstream library (in the project root):

```bash
npm install
npm run build
```

2. Navigate to the React example directory:

```bash
cd examples/react-app
```

3. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm start
```

This will open the application at [http://localhost:3000](http://localhost:3000).

### Building

To build the application for production:

```bash
npm run build
```

### Preview

To preview the production build:

```bash
npm run preview
```

## Project Structure

- `/public` - Static assets
- `/src` - Application source code
  - `/components` - Reusable UI components
  - `/pages` - Page components for different routes
  - `App.jsx` - Main application component with routing
  - `main.jsx` - Application entry point
  - `index.css` - Global styles with Tailwind CSS

## Clickstream Integration

The Clickstream Tracker is initialized in the `App.jsx` component:

```jsx
useEffect(() => {
  // Initialize the Clickstream tracker
  const tracker = new ClickstreamTracker({
    samplingRate: 1,
    maskAllInputs: false,
    environmentId: 'react-app-example',
    maxEvents: 50,
    // remoteEndpoint: 'http://your-remote-endpoint.com/events',
  });
  
  // Start tracking
  tracker.start();
  
  // Cleanup on unmount
  return () => {
    tracker.stop();
  };
}, []);
```

This setup automatically tracks:
- Navigation between pages
- Form interactions
- Button clicks
- Scrolling and mouse movements
- And more!

## License

This example is part of the Clickstream Tracker project and is licensed under the same terms as the main project. 