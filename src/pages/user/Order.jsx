import React,{useState,useEffect} from 'react'
import Layout from '../../components/layout/layout'
import UserMenu from '../../components/layout/UserMenu'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment';

const Order = () => {
  const [orders,setOrders]=useState([]);
  const [auth,setAuth]=useAuth();

  const getOrders=async()=>{
try{
const {data}=await axios.get("https://ecommerce-api-bay-three.vercel.app/api/v1/auth/orders");
setOrders(data);
}catch(err){
  console.log(err);
}
  }
  useEffect(()=>{
    if(auth?.token) getOrders();
  },[auth])
  return (
    <Layout>
<div className='upper pt-4 '>
    <div className='row'>
<div className='col-md-4'>
<UserMenu/>
</div>
<div className='col-md-8 orderList'>
    <h1 className='text-center'>All orders</h1>
    {orders?.map((o,i)=>{
      console.log(o.products);
      return <>
      
      <div className='container ' style={{zIndex:"0"}}>

      <div className="row">
          <div className="col-md-12">
            {o?.products?.map((p,i) => (
              <div className="row mb-2 card flex-row p-3" style={{zIndex:"0"}}>
                <div className="col-md-4">
                  <img
                    src={`https://ecommerce-api-bay-three.vercel.app/api/v1/products/product-photo/${p._id}`}
                 className="card-img-top"
                    alt="..."
                    width={"60px"}

                    height={"200px"}
                  />
                </div>
                <div className="col-md-8">
                  <h4>{p.name}</h4>
                  <p>{p.description.substring(0, 30)}</p>
                  <p className='priceP'>Price: {p.price}</p>
                  <p>Status: {o.statue}</p>
                
                  </div>

                  </div>)
            )}
                </div>
              </div>
            

      </div>{/*fkjsjflksjkfjsklajfkl*/}
      </>
    })}
</div>
    </div>
</div>
    </Layout>
      
  )
}

export default Order
