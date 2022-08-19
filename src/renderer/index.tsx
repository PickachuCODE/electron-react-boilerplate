import { ThemeContextProvider } from 'context/ThemeContext';
import { createRoot } from 'react-dom/client';
import App from './RazorHub/App';

const container = document.getElementById('root')!;
const root = createRoot(container);
root.render(
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
);



// Ipc Renderer - Functions

// calling IPC exposed from preload script
window.electron.ipcRenderer.once('ipc-example', (arg) => {
  // eslint-disable-next-line no-console
  console.log(arg);
});
window.electron.ipcRenderer.sendMessage('ipc-example', ['ping']);
