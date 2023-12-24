import React,{useState,useEffect} from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import {Link} from "react-router-dom";
import Layout from "../../components/layout/layout";

const Products = () => {
    const auth=useAuth();
const [products,setProducts]=useState([]);


    //get all products
const getAllProduct=async()=>{
    try{
const {data}=await axios.get("https://ecommerce-api-liard.vercel.app/api/v1/products/get-product");
console.log(data);
setProducts(data.product);
    }catch(error){
        console.log(error);
        toast.error("Something went wrong in getting product");
    }
}

//lifecycle update

useEffect(()=>{
getAllProduct();
},[]);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div >
            <AdminMenu />
          </div>

          <div className="col-md-9 adminViews">
            <h1 className="text-center">Product List</h1>
            <div className="d-flex flex-wrap">
            {products?.map(p=>(<>
            <Link key={p._id} to={`/dashboard/admin/products/product/${p.slug}`} className="product-link">
                <div className="card m-2" style={{width:"18rem"}} >
  <img src={`https://ecommerce-api-liard.vercel.app/api/v1/products/product-photo/${p._id}`} className="card-img-top cardsImg" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description}</p>
  </div>
</div>
</Link>
            </>))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
