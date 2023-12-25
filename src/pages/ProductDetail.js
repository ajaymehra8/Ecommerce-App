import React,{useState,useEffect} from 'react'
import Layout from '../components/layout/layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '../context/cart'

const ProductDetail = () => {
    const navigate=useNavigate();
    const [cart, setCart] = useCart();

    const params=useParams();
    const [product,setProduct]=useState({});
    const [relatedProduct,setRelatedProduct]=useState([]);

    //get related product

    const getRelatedProduct=async(pid,cid)=>{
        try{
const {data}=await axios.get(`https://ecommerce-api-tau-eight.vercel.app/api/v1/products/related-product/${pid}/${cid}`);
setRelatedProduct(data?.products);
        }catch(error){
            console.log(error);
        }
    }
    
    //get products

    const getProduct=async()=>{
        try{
const {data}=await axios.get(`https://ecommerce-api-tau-eight.vercel.app/api/v1/products/getSingle-product/${params.slug}`);
setProduct(data?.product);
getRelatedProduct(data?.product._id,data?.product.category);

        }catch(error){
            console.log(error);
        }
    }
    useEffect(()=>{
        if(params?.slug) getProduct();
     },[params?.slug])
  return (
    <Layout>
      <div className='upper'>
        <div className='row mt-2'>
      <div className='col-md-6'>
      <img
                    src={`https://ecommerce-api-tau-eight.vercel.app/api/v1/products/product-photo/${product._id}`}
                    className="card-img-top"
                    alt="..."
                    height={"400vh"}
                    
                  />      </div>
      <div className='col-md-6 '>
<h1 className='text-center'>Product details</h1>
<h5>Product Name: <span className='priceP'>{product.name}</span></h5>
<h5>Product Description: <span className='priceP'>{product.description}</span></h5>
<h5 >Product Price: <span className='priceP'>₹{product.price}</span></h5>

<button className="btn btn-secondary ms-1" onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem('cart',JSON.stringify([...cart,product]));
                        toast.success("Item added to cart 🎉🎉");
                        
                      }}>Add to Cart</button>


      </div>
      </div>
      <div className='row'>
<h1 className='text-center'>Similar Product</h1>
<div className="d-flex flex-wrap">
            {relatedProduct?.map((p) => (
              <>
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    src={`https://ecommerce-api-tau-eight.vercel.app/api/v1/products/product-photo/${p._id}`}
                    className="card-img-top cardsImg"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 20)}...
                    </p>
                    <p className="card-text"><span className='priceP'>₹{p.price}</span></p>

                    <button className="btn btn-secondary ms-1" onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem('cart',JSON.stringify([...cart,p]));
                        toast.success("Item added to cart 🎉🎉");
                        
                      }}>Add to Cart</button>
                  </div>
                </div>
              </>
            ))}
          </div>      </div>
          </div>
    </Layout>
  )
}

export default ProductDetail
