import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// router
import router from './router/index.tsx'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  // routerを導入
  <RouterProvider router={router} />
)
