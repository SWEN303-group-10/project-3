import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/app.css'
import './index.css'
import App from './App.tsx'
import { NotificationsProvider } from './components/Notifications'
import sprite from './assets/icons.svg?raw'

document.body.insertAdjacentHTML(
  'afterbegin',
  sprite.replace('<svg ', '<svg aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden" '),
)

createRoot(document.getElementById('root')!).render(
   <StrictMode>
    <NotificationsProvider>
      <App />
    </NotificationsProvider>
  </StrictMode>
)
