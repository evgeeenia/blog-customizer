import { createRoot } from 'react-dom/client';
import { App } from 'components/app/App';
import { StrictMode } from 'react';
import './styles/index.scss';

const root = createRoot(document.getElementById('root')!); 
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
