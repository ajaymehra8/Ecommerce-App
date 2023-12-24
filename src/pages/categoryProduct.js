import React,{useState,useEffect} from 'react'
import Layout from '../components/layout/layout'
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useCart } from '../context/cart';

const CategoryProduct = () => {
  const navigate=useNavigate();
  const [cart, setCart] = useCart();
  const params=useParams();
  const [product,setProduct]=useState([]);
  const [category,setCategory]=useState([]);

  const getProductByCat=async()=>{
    try{
const {data}=await axios.get(`https://ecommerce-api-liard.vercel.app/api/v1/products/product-category/${params.slug}`);

setProduct(data?.product);
setCategory(data?.category);
    }catch(error){console.log(error);}
  }

  useEffect(()=>{
    if(params) getProductByCat();
  },[params]);

  return (
    <Layout>
    <div className='  text-center frontView upper'>
      <h1>Category- {category.name}</h1>
      <h1>{product.length} products found.</h1>
      <div className="d-flex flex-wrap align-items-center">
            {product?.map((p) => (
              <>
                <div className="card m-2 homeCards" style={{ width: "18rem" }}>
                  <img
                    src={`https://ecommerce-api-liard.vercel.app/api/v1/products/product-photo/${p._id}`}
                    className="card-img-top cardsImg"

                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 20)}...
                    </p>
                    <p className="card-text priceP">₹{p.price}</p>

                    <button className="btn btn-primary ms-1" onClick={()=>{navigate(`/product/${p.slug}`)}}>More Details</button>
                    <button className="btn btn-secondary ms-1" onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem('cart',JSON.stringify([...cart,p]));
                        toast.success("Item added to cart 🎉🎉");
                        
                      }}>Add to Cart</button>
                  </div>
                </div>
              </>
            ))}
          </div>

    </div>
    </Layout>
  )
}

export default CategoryProduct
