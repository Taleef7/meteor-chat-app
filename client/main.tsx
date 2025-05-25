// client/main.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Meteor } from 'meteor/meteor';
import App from '../imports/ui/App'; // We'll create this next

Meteor.startup(() => {
  const container = document.getElementById('react-target');
  if (container) {
    const root = createRoot(container);
    root.render(<App />);
  } else {
    console.error('Could not find react-target element to mount React app.');
  }
});