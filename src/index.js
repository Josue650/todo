import './styles.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom'
import App from './components/pages/App/App';


const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
      <App />
  </StrictMode>
);
