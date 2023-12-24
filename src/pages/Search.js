import React from 'react'
import Layout from '../components/layout/layout'
import { useSearch } from '../context/search'
import { toast } from "react-hot-toast";
import { Prices } from "../components/Prices";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const Search = () => {
const [values,setValues]=useSearch();
const [cart, setCart] = useCart();

  return (
    <Layout title={"Search Results- Ecommerce Website"}>
      <div className='someP'>
<div className='text-center'>
<h6>{values?.result.length<1?<div className='itemNotF'></div>:<h1>{`Found ${values?.result.length} item`}</h1>}</h6>
<div className="d-flex flex-wrap mt-4 justify-content-center">
            {values?.result?.map((p) => (
              <>
                <div className="card m-2 homeCards" >
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
                    <p className="card-text">₹{p.price}</p>

                    <button className="btn btn-primary ms-1">More Details</button>
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
      </div>
    </Layout>
  )
}

export default Search
