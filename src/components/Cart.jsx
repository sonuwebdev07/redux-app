import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { addToCart, clearCart, decreaseCart, removeFromCart } from '../store/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';



const Cart = () => {

  const [state, setState] = useState([])
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => {
        setState(res.data)
      })
  }, [])

  const addItemToCart = (product) => {
    dispatch(addToCart(product))
    toast.success("Item Added to Cart !!!")
  }
  const increaseToCart = (product) => {
    dispatch(addToCart(product))
  }

  const decreaseFromCart = (product) => {
    dispatch(decreaseCart(product))
  }

  const RemoveSingleProduct=(product)=>{
        dispatch(removeFromCart(product))
  }

  const clearCartData = () => {
    dispatch(clearCart())
  }

  return (
    <div>
      {
        cart.cartItems.length === 0 ? (
          <div className='text-center my-4'>
            <h4 className="card-title mb-4">Your shopping cart</h4>
            <p className='fs-5'>Your Cart is Currently Empty</p>
            <Link to='/' className='nav-link fs-6 text-primary' >Start Shopping <i className="fa-solid fa-arrow-right"></i></Link>
          </div>
        ) :
          (
            <>

              <section className="bg-light my-2">
                <div className="container">
                  <h4 className="card-title py-4">Your shopping cart</h4>

                  {cart.cartItems &&
                    cart.cartItems.map((cartItem) =>
                      <div className="row mb-3" key={cartItem.id}>
                        <div className="">
                          <div className="card border shadow-0">
                            <div className="m-4">
                              <div className="row mb-4">

                                <div className="d-flex">
                                  <div>
                                    <img
                                      src={cartItem.image}
                                      className="border rounded me-3"
                                      style={{ width: 96, height: 96 }}
                                    />
                                  </div>
                                  <div className='ms-auto me-auto'>
                                    <p className='h6'> {cartItem.title.substring(0, 20)}</p>
                                    <p className="text-muted">{cartItem.description.substring(0, 30)}</p>
                                  </div>
                                  <div className='ms-auto'>
                                    <small className="h6">
                                      ${cartItem.price}
                                    </small>
                                  </div>
                                  <div className='ms-auto me-auto'>
                                    <button className='btn btn-outline-danger border' onClick={() => { decreaseFromCart(cartItem) }}>-</button>
                                    <span className='btn border-top border-bottom'>Qty : {cartItem.productQuantity}</span>
                                    <button className='btn btn-outline-primary border' onClick={() => { increaseToCart(cartItem) }} >+</button>
                                  </div>
                                  <div className='ms-auto'>
                                    <small className="h6">
                                      ${cartItem.price * cartItem.productQuantity}
                                    </small>
                                  </div>
                                  <div className='ms-auto'>
                                    <button className="btn btn-outline-danger border" onClick={()=>{RemoveSingleProduct(cartItem)}}> Remove</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }

                  <div className='d-flex'>
                    <div className='pb-3'>
                      <button className='btn btn-danger' onClick={() => { clearCartData() }}>Clear Cart</button>
                    </div>
                    <div className='ms-auto'>
                      <p>Subtotal <span className='ms-5 h6'>Amount</span></p>
                      <button className='btn btn-primary col-12'>Checkout</button>
                      <Link to='/' className='nav-link fs-6 py-3' ><i className="fa-solid fa-arrow-left"></i> Continue Shopping </Link>
                    </div>
                  </div>
                </div>
              </section>



              <section>
                <div className="container my-5">
                  <header className="mb-4">
                    <h3>Recommended items</h3>
                  </header>
                  <div className="row">
                  <Toaster/>
                    {
                      state.map((item, index) =>
                        <div className=" col-md-3 mt-3" key={index}>
                          <Card
                            raised sx={{
                              maxWidth: 300,
                              margin: "0 auto",
                              padding: "0.1em",
                            }}>
                            <CardMedia
                              component="img"
                              alt="green iguana"
                              height="140"
                              image={item.image}
                              sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}

                            />
                            <CardContent>
                              <Typography gutterBottom variant="h6" component="div">
                                <span className='fs-6'>{item.title.substring(0, 20)}</span>
                              </Typography>
                            </CardContent>
                            <CardActions>
                              <Button className='ms-auto me-auto' variant="contained" size="small" onClick={() => { addItemToCart(item) }}>Add to Cart</Button>
                            </CardActions>
                          </Card>
                        </div>
                      )
                    }
                  </div>
                </div>
              </section>
            </>
          )}
    </div>
  )
}

export default Cart

