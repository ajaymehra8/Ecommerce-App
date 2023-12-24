import React,{useState} from 'react'
import Layout from '../../components/layout/layout';
import toast from 'react-hot-toast';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../../styles/authStyle.css";

const Register = () => {
const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [address,setAddress]=useState("");
const [phone,setphone]=useState("");
const [question,setquestion]=useState("");

const navigate=useNavigate();


const handleSubmit=async(e)=>{
e.preventDefault();
try{
const res= await axios.post(`https://ecommerce-api-liard.vercel.app/api/v1/auth/register`,
{name,email,password,phone,address,question});
if(res.data.success){
  
      toast.success(res.data.message);
    
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
    <Layout title="Register- Ecommerce App">

<div className="register">
    <h1>Register Page</h1>
<form onSubmit={handleSubmit}>
  
  <div className="mb-3">
    <input 
    type="text" 
    value={name}
    onChange={(e)=>{setName(e.target.value)}}
    className="form-control"
    id="exampleInputName1" 
    placeholder='Name'
    required/>
  </div>
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
  <div className="mb-3">
    <input 
    type="text" 
    value={address}
    onChange={(e)=>{setAddress(e.target.value)}}

    className="form-control" 
    id="exampleInputName2" 
    placeholder="Address" 
    required/>
  </div>
  <div className="mb-3">
    <input 
    type="text" 
    value={phone}
    onChange={(e)=>{setphone(e.target.value)}}

    className="form-control" 
    id="exampleInputName2" 
    placeholder="Mobile phone" 
    required/>
  </div>

  <div className="mb-3">
    <input 
    type="text" 
    value={question}
    onChange={(e)=>{setquestion(e.target.value)}}

    className="form-control" 
    id="exampleInputName2" 
    placeholder="What is your bestfriend name" 
    required/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>

</div>
    </Layout>
  )
}

export default Register
