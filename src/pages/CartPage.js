import React,{useState,useEffect} from "react";
import Layout from "../components/layout/layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { NavLink, useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";


const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken,setClientToken]=useState("");
  const [instance,setInstance]=useState("");
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();

  //total price
  // const totalPrice = async () => {
  //     try {
  //       const total = cart?.reduce((acc, item) => acc + item.price, 0);
  //       return total.toLocaleString("en-US", {
  //         style: "currency",
  //         currency: "INR"
  //     });
  //             } catch (error) {
  //       console.error(error);
  //       return 0;
  //     }
  //   };

  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart];
      console.log(pid + ":pid");

      let index = myCart.findIndex((item) => item._id == pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

//get payment token

const getToken=async()=>{
  try{
const {data}=await axios.get("https://ecommerce-api-liard.vercel.app/api/v1/products/braintree/token");

setClientToken(data?.clientToken);

  }
  catch(error){
    console.log(error);
  }
}

useEffect(()=>{
getToken();
},[auth?.token])

//handle payments

const handlePayments=async()=>{
  
  try{
    setLoading(true);
    
    const { nonce } = await instance.requestPaymentMethod();
const {data}=axios.post("https://ecommerce-api-liard.vercel.app/api/v1/products/braintree/payment",{
  nonce,cart
});
setLoading(false);
localStorage.removeItem('cart');
setCart([]);
navigate("/dashboard/user/orders");
toast.success("Payment completed");

  }catch(error){
    console.log(error);
    setLoading(false);
  }
}

  return (
    <Layout>
      <div className="upper">
        <div className="row ">
          <div className="col-md-12 cartPageStyle ">
            <h1 className="text-center bg-light " style={{marginLeft:"0",padding:"5px 0"}}>
              {`Hello ${auth?.token ? auth?.user.name : " "}`}
            </h1>

            <h2 className="text-center mb-4">
              {cart?.length > 0
                ? `${cart.length} items in your cart ${
                    auth?.token ? " " : "Please login to checkout"
                  }`
                : ""}
            </h2>
          </div>
        </div>
        <div className="row ">
          <div className="col-md-6">
            {cart?.map((p) => (
              <div className="row mb-2 card flex-row p-3">
                <div className="col-md-4">
                  <img
                    src={`https://ecommerce-api-liard.vercel.app/api/v1/products/product-photo/${p._id}`}
                    className="card-img-top"
                    alt="..."
                    width={"100px"}
                    height={"150px"}
                  />
                </div>
                <div className="col-md-8">
                  <h4>{p.name}</h4>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price: <span className="priceP">₹{p.price}</span></p>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      removeCartItem(p._id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
         
         {cart.length>0? <div className="col-md-5 text-center paymentWay">
            <h2>Cart Summary</h2>

            <hr />

            <h4>Total: ₹{cart?.reduce((acc, item) => acc + item.price, 0)}</h4>
         
<div className="mt-2">
                {(!clientToken||!cart?.length||!auth.token) ? (
                  ""
                ) : (
                  <>
                    <DropIn
                                            className=""

                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className="btn btn-primary"
                      onClick={handlePayments}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </>
                )}
              </div>
          </div>:<>
          <div className="myCartDiv">
<NavLink to={'/'} className="cartBtn">Shop Now</NavLink>
          </div>
          </>}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
