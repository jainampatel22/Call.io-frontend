
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { SocketProvider } from './context/SocketProviders'
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
<SocketProvider>
  <App/>
</SocketProvider>
</BrowserRouter>
,
)
