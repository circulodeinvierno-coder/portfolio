import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { RouterProvider } from './lib/router';
import './index.css';

// Enlaces antiguos por ancla: /#fanzines → /fanzines
const legacyHash = window.location.hash.replace('#', '');
if (legacyHash === 'fanzines' || legacyHash === 'experimentos') {
  window.history.replaceState({}, '', `/${legacyHash}`);
} else if (legacyHash) {
  window.history.replaceState({}, '', '/');
}

createRoot(document.getElementById('root')!).render(
  <RouterProvider initialPath={window.location.pathname}>
    <App />
  </RouterProvider>,
);
