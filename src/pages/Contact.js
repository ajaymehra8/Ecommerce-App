import React from 'react'
import Layout from '../components/layout/layout'

const Contact = () => {
  return (
    <Layout>
      <div className="row contactus upper">
        <div className="col-md-6 ">
          <img
            src="https://static.vecteezy.com/system/resources/previews/002/147/279/non_2x/young-man-and-woman-with-headphones-microphone-and-computer-customer-service-support-or-call-center-concept-free-vector.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3">
            www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
            012-3456789
          </p>
          <p className="mt-3">
             1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
