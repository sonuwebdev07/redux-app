import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import Footer from './components/Footer'
import Pagenotfound from './components/PageNotFound'
import Productdetail from './components/Productdetail'
import Cart from './components/Cart'


function App() {

  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Dashboard/>}/>
        <Route path='cart' element={<Cart/>}/>
        <Route path='product-detail/:id' element={<Productdetail/>} />
        <Route path='*' element={<Pagenotfound/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
