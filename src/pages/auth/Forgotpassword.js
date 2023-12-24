import React,{useState} from 'react'
import Layout from '../../components/layout/layout';
import toast from 'react-hot-toast';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { useAuth } from '../../context/auth';
import "../../styles/authStyle.css";

const ForgotPassword = () => {
  const [email,setEmail]=useState("");
  const [newPassword,setnewPassword]=useState("");
  const [question,setquestion]=useState("");

  const [auth,setAuth]=useAuth();
  
  
  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
    const res= await axios.post(`https://ecommerce-api-bay-three.vercel.app/api/v1/auth/forgot-password`,
    {email,newPassword,question});
    if(res.data.success){
      
          toast.success(res.data.message);
           setAuth((auth)=>({
            ...auth,
            user:res.data.user,
            token:res.data.token
           }));
    setTimeout(()=>{
    navigate("/login")
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
    <Layout title={"Forgot newPassword- Ecommerce app"}>
<div className="register">
    <h1>
      Reset Password
    </h1>
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
    type="text"
    value={question}
    onChange={(e)=>{setquestion(e.target.value)}}

    className="form-control" 
    id="exampleInputEmail" 
    placeholder='What is your best friend name?'
    required/>
  </div>

  <div className="mb-3">
    <input 
    type="password" 
    value={newPassword}
    onChange={(e)=>{setnewPassword(e.target.value)}}

    className="form-control" 
    id="exampleInputnewPassword1" 
    placeholder="New Password"
    required/>
  </div>
 
{/* <div className='mb-3'>
  <button type="button" className="btn btn-primary" onClick={()=>{navigate("/forgot-newPassword")}}>Forgot newPassword</button>
  </div> */}
  <button type="submit" className="btn btn-primary">Reset</button>
</form>

</div>  
  </Layout>
  )
}

export default ForgotPassword
