import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// 🆕 Add this line to register the service worker
import { registerSW } from 'virtual:pwa-register';

// Register PWA Service Worker
registerSW({
  onNeedRefresh() {
    console.log('🔄 New version available. Please refresh.');
  },
  onOfflineReady() {
    console.log('✅ App is ready to work offline!');
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
