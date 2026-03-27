import { createRoot } from 'react-dom/client'
import './index.scss'

// router
import router from './router/index.tsx'
import { RouterProvider } from 'react-router-dom'

// store 
import { Provider } from 'react-redux'
import store from './store/index.tsx'

// initialize style
import "normalize.css"


createRoot(document.getElementById('root')!).render(
  // storeを導入
  <Provider store={store}>
    {/*  routerを導入 */}
    <RouterProvider router={router} />
  </Provider>

)
