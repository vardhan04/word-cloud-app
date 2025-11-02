# Frontend - 3D Word Cloud Visualizer

React application with Three.js (React Three Fiber) for 3D word cloud visualization.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

Application will start on http://localhost:5173

## Features

- URL input with validation
- Sample article links
- Real-time loading states
- Error handling
- 3D interactive word cloud
- Auto-rotating camera
- Mouse controls (drag to rotate, scroll to zoom)
- Responsive design

## Components

- **App.jsx** - Main application with UI controls
- **WordCloud.jsx** - 3D visualization using React Three Fiber

## Technologies

- React 18
- Vite
- React Three Fiber
- @react-three/drei
- Three.js
- Axios

## Build for Production

```bash
npm run build
```

Output will be in dist/ directory.
