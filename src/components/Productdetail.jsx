import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactImageMagnify from 'react-image-magnify';
import { addToCart } from '../store/slices/cartSlice';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';


const Productdetail = () => {

    const {id}=useParams()
    const dispatch=useDispatch();

    const [state,setState]=useState(
        {
            title:'',
            price:'',
            category:'',
            description:'',
            image:''
        }
    )

    useEffect(()=>{
        axios.get("https://fakestoreapi.com/products/"+id)
        .then((res)=>{
            setState(res.data)
        })
        window.scroll(0,0)
    },[])

    const addItemToCart=(product)=>{
        dispatch(addToCart(product))
        toast.success("Item Added to Cart !!")
    }

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
        <Toaster/>
            <div className="col-md-12">
            <div className="card mb-3">
            <div className="row g-0 shadow">
              <div className="col-md-6 my-3">
                <ReactImageMagnify {...{
                    smallImage: {
                        alt: 'Img',
                        // isFluidWidth: true,
                        src: state.image,
                        width: 550,
                        height: 600
                    },
                    largeImage: {
                        src: state.image,
                        width: 900,
                        height: 1100
                    }
                }} />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title">{state.title}</h5>
                  <p className="card-text">{state.description}</p>
                  <input type="submit" value="Add to Cart" className='btn btn-primary' onClick={()=>{addItemToCart(state)}}/>
                </div>
              </div>
            </div>
          </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Productdetail
