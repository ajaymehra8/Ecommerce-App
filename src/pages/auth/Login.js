import React,{useState} from 'react'
import Layout from '../../components/layout/layout';
import toast from 'react-hot-toast';
import axios from "axios";
import {useNavigate,useLocation} from "react-router-dom";
import { useAuth } from '../../context/auth';
import "../../styles/authStyle.css";

const Login = () => {

const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [auth,setAuth]=useAuth();


const navigate=useNavigate();
const location=useLocation();

const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
    const res= await axios.post(`https://ecommerce-api-tau-eight.vercel.app/api/v1/auth/login`,
    {email,password});
    if(res.data.success){
      
          toast.success(res.data.message);
           setAuth((auth)=>({
            ...auth,
            user:res.data.user,
            token:res.data.token
           }));
           localStorage.setItem('auth',JSON.stringify(res.data));
    setTimeout(()=>{
    navigate(location.state||"/")
    },10);
    }
    else{
      toast.error(res.data.message);
    
    }
    }
    catch(error){
      console.log(error);
      toast.error("Something went wrong");
    }
    }

  return (
    <Layout title="Login- Ecommerce App">

<div className="register">
    <h1>Login Form</h1>
<form onSubmit={handleSubmit}>
  
 
  <div className="mb-3">
    <input 
    type="email"
    value={email}
    onChange={(e)=>{setEmail(e.target.value)}}

    className="form-control" 
    id="exampleInputEmail" 
    placeholder='Email'
    required/>
  </div>
  <div className="mb-3">
    <input 
    type="password" 
    value={password}
    onChange={(e)=>{setPassword(e.target.value)}}

    className="form-control" 
    id="exampleInputPassword1" 
    placeholder="password"
    required/>
  </div>
 

  <button type="submit" className="btn btn-primary">Log in</button>

  <div className='mb-3'>
  <button type="button" style={{border:"none",color:"red",textDecoration:"underline",background:"none"}}className="btn " onClick={()=>{navigate("/forgot-password")}}>Forgot password</button>
  </div>
</form>

</div>
    </Layout>
  )
}

export default Login
