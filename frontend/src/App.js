import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'

import Layout from './components/Layout'
import Home from './pages/Home'
import ProductDetails from './pages/ProductDetails'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import { loadUser } from './actions/user'
import store from './store'

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />

        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='search/:keyword' element={<Home />} />
          <Route path='product/:id' element={<ProductDetails />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App
