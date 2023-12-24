import React,{useState,useEffect} from 'react'
import UserMenu from '../../components/layout/UserMenu'
import Layout from '../../components/layout/layout'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'

const Profile = () => {
  const [auth,setAuth]=useAuth();
  const [name,setName]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");
const [address,setAddress]=useState("");
const [phone,setphone]=useState("");

///get user data
useEffect(() => {

  
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setphone(phone);
    setEmail(email);
    setAddress(address);
  
}, [auth?.user]);


// form function
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.put("https://ecommerce-api-bay-three.vercel.app/api/v1/auth/profile", {
      name,
      email,
      password,
      phone,
      address,
    });
    if (data?.error) {
      toast.error(data?.error);
    } else {
      setAuth({...auth,user:data.updatedUser},);
      let ls = localStorage.getItem("auth");
      ls = JSON.parse(ls);
      ls.user = data.user;
      localStorage.setItem("auth", JSON.stringify(ls));
      toast.success("Profile Updated Successfully");
    }
  } catch (error) {

    toast.error("Something went wrong");
  }
};


  return (
    <div>
       <Layout>
<div>
    <div className='row'>
<div>
<UserMenu/>
</div>
<div className='col-md-12'>
<div className="updateProfileForm">
<h2 style={{color:"#001f3f",letterSpacing:"2px"}}>Your Profile</h2>

<form onSubmit={handleSubmit}>
  
  <div className="mb-3">
    <label>Name</label>
    <input 
    type="text" 
    value={name}
    onChange={(e)=>{setName(e.target.value)}}
    className="form-control"
    id="exampleInputName1" 
    placeholder='Name'
    />
  </div>
  <div className="mb-3">
  <label>Email</label>

    <input 
    type="email"
    value={email}
    onChange={(e)=>{setEmail(e.target.value)}}

    className="form-control" 
    id="exampleInputEmail" 
    placeholder='Email'
    disabled
    />
  </div>
  
  <div className="mb-3">
  <label>Address</label>

    <input 
    type="text" 
    value={address}
    onChange={(e)=>{setAddress(e.target.value)}}

    className="form-control" 
    id="exampleInputName2" 
    placeholder="Address" 
    />
  </div>
  <div className="mb-3">
  <label>Mobile Number</label>

    <input 
    type="text" 
    value={phone}
    onChange={(e)=>{setphone(e.target.value)}}

    className="form-control" 
    id="exampleInputName2" 
    placeholder="Mobile phone" 
    />
  </div>

  

  <button type="submit" className="btn btn-primary">Update</button>
</form>
</div>
</div>
    </div>
</div>
    </Layout>
    </div>
  )
}

export default Profile
