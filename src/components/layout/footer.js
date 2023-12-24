import React from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <div className='footer'>
      <h3 className='text-center'>
        All Rights Reserved © Uk
      </h3>
    <p className='text-center mt-3'>
        <Link to="/about">About</Link> | 
         <Link to="/contact">Contact</Link> |

          <Link to="/policy">Privacy policy</Link>

    </p>
    </div>
  )
}

export default Footer
