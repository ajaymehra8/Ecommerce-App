import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/header';
import Footer from '../components/layout/footer';

const h1Style={
  fontSize:"60px",
  fontWeight:"700"
}
const h2Style={
  fontSize:"40px",
  fontWeight:"400"
}
const button={
  textDecoration:"none",
  color:"black",
  backgroundColor:"white",
  border:"1px solid black",
  padding:"10px 15px",
  boxSizing:"border-box",
  transition:"all .5s"
}

const Pagenotfound = () => {
  return (
    <>
    <Header />
    <div className='mainPnf upper'>
      <h1 style={h1Style}>404</h1>
      <h2 style={h2Style}>Oops! Page Not Found</h2>
      <Link to="/" style={button} className='pnfBtn'>Go Back</Link>
    </div>
    <Footer />
    </>
  )
}

export default Pagenotfound
