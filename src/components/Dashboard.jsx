import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import  PacmanLoader  from 'react-spinners/PacmanLoader';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import toast, { Toaster } from 'react-hot-toast';



const Dashboard = () => {

  const [state, setState] = useState([])
  const [cate, setCate] = useState([])
  const [loading,setLoading]=useState(false)
  const [SearchParams] = useSearchParams()
  const _useNavigate=useNavigate()
  const dispatch = useDispatch()
  const query = SearchParams.get('cate_name');

  const getProducts = () => {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => {
        setState(res.data)
      })
  }

  const getAllCategories = () => {
    axios.get("https://fakestoreapi.com/products/categories")
      .then((res) => {
        setCate(res.data)
      })
  }


  const showCategory = (cate_name) => {
    axios.get("https://fakestoreapi.com/products/category/" + cate_name)
      .then((res) => {
        setState(res.data)
      })
  }

  useEffect(() => {
    getProducts()
    getAllCategories()

    if(query!=null) 
    {
      showCategory(query)
    }
  }, [query])

  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    }, 1000)
  },[])



  const goToNext = (id) => {
    _useNavigate(`product-detail/${id}`)
  }

  const addItemToCart = (product) =>{
        dispatch(addToCart(product))
        toast.success("Item Added to Cart !!")
  }

  return (
    <div>
    <Toaster/>
      {
        loading ? 
        <div style={{marginLeft:"48%",marginTop:"20%", marginBottom:"30%"}} >
          <PacmanLoader color="#039dfc" loading={loading} size={20} />         
        </div> :
        
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 mt-3">
            <ul className="list-group">
              <li className="list-group-item active">All Categories</li>
              {
                cate.map((cate_data, index) =>
                  <li className="list-group-item" style={{ textTransform: "capitalize" }} key={index}>
                    <a href="javascript:void(0);" className='nav-link' onClick={() => { showCategory(cate_data) }}>{cate_data}</a>
                  </li>
                )
              }

            </ul>
          </div>
          <div className="col-md-10">
            <div className="container-fluid">
              <div className="row">
                {
                  state.map((item, index) =>
                    <div className="col-md-3 mt-3" key={index}>
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
                          <Typography variant="body2" color="text.secondary">
                            {item.description.substring(1, 40)}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button variant="contained" size="small" onClick={()=>{addItemToCart(item)}}>Add to Cart</Button>
                          <span className='ms-auto'><Button variant="contained" size="small" onClick={() => { goToNext(item.id) }}>view</Button></span>
                        </CardActions>
                      </Card>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  )
}

export default Dashboard
