import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Header = () => {

  const [cate,setCate]=useState([])

  const items = useSelector((state)=>state.cart)

  useEffect(()=>{
    axios.get("https://fakestoreapi.com/products/categories")
    .then((res)=>{
      setCate(res.data)
    })
  },[])

  return (
    <div>
    <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
    <div className="container-fluid">
      <Link className="navbar-brand" to='/'>Navbar</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
          </li>
          <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to='#' role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Category
          </Link>
          <ul className="dropdown-menu">
            {
              cate.map((item,index)=>
              <li key={index}><Link className="dropdown-item" style={{textTransform:"capitalize"}} to={`/?cate_name=${item}`} >{item}</Link></li>
            )
            }

            
          </ul>
        </li>
        </ul>
            <Link to='cart'>
            <button type="button" className="btn position-relative me-3 mt-2">
            <i className="fa-solid fa-cart-shopping fa-lg"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
              {items.cartItems.length}
              <span className="visually-hidden">unread messages</span>
            </span>
          </button>
          </Link>
        
      
      </div>
    </div>
  </nav>
    </div>
  )
}

export default Header
