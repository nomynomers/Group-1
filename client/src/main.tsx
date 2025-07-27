import { StrictMode } from 'react' // Import StrictMode for highlighting potential problems in an application.
import { createRoot } from 'react-dom/client' // Import createRoot from react-dom/client to enable concurrent mode features.
import './index.css' // Import the global CSS file for basic styling.
import App from './App.tsx' // Import the main App component.

// Get the root DOM element where the React application will be mounted.
// The '!' is a non-null assertion operator, asserting that 'root' element will not be null.
createRoot(document.getElementById('root')!).render(
  // StrictMode is a tool for highlighting potential problems in an application.
  // It activates additional checks and warnings for its descendants.
  <StrictMode>
    <App /> {/* Render the main App component within StrictMode. */}
  </StrictMode>,
)
