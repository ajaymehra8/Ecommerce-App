import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { toast } from "react-hot-toast";
import { Prices } from "../components/Prices";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const Home = () => {
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [check, setCheck] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-api-tau-eight.vercel.app/api/v1/category/categories"
      );
console.log(data);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get total count

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-api-tau-eight.vercel.app/api/v1/products/product-count"
      );
      setTotal(data?.total);
    } catch (err) {
      console.log(err);
    }
  };
  //get products
  const getAllProducts = async () => {
    try {
      setLoad(true);
      const { data } = await axios.get(
        `https://ecommerce-api-tau-eight.vercel.app/api/v1/products/product-list/${page}`
      );
      setLoad(false);

      console.log(data);
      setProducts(data.products);
    } catch (error) {
      setLoad(false);
      console.log(error);
    }
  };
  useEffect(() => {
    if (!check.length || !radio.length) getAllProducts();
  }, [check.length, radio.length]);
  //load more

  const handleLoad = async () => {
    try {
      console.log("handledLoad:", page);
      setLoad(true);
      const { data } = await axios.get(
        `https://ecommerce-api-tau-eight.vercel.app/api/v1/products/product-list/${page}`
      );
      setLoad(false);
      console.log(data); // Log the data received from the server
      setProducts([...products, ...data.products]);
    } catch (error) {
      setLoad(false);
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("page value: ", page);
    if (page === 1) return;
    handleLoad();
  }, [page]);

  //filter by cat

  const handleFilter = (value, id) => {
    let all = [...check];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setCheck(all);
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (check.length || radio.length) filterProduct();
  }, [check, radio]);

  //GET FILTERED PRODUCTS

  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        "https://ecommerce-api-tau-eight.vercel.app/api/v1/products/filter-products",
        {
          check,
          radio,
        }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title="All Products- Best Offers">

      <div className="showSection">
        <div className="frontContent">
<h1>Signature Elegance</h1>
<h5>Discover Your Signature Style with Our Hero Collection - Where Fashion Meets Individuality!</h5>
<a className="exploreBtn" href="#showCase">Explore Now </a>
        </div>
      </div>
      <div className="row mt-3 homePage" id="showCase">

     {/*   <div className=" pl-5 homeFilters">//filtaarjksdajf
          <h4 className="text-left">Filter by categories</h4>
          <div className="d-flex flex-column">
            {categories.map((c) => (
              <>
                <Checkbox
                className="fc"
                  key={c._id}
                  onChange={(e) => {
                    handleFilter(e.target.checked, c._id);
                  }}
                >
                  {c.name}
                </Checkbox>
              </>
            ))}
          </div>
          {/* FILTER BY PRICE 
          <h4 className="text-left mt-4">Filter by price</h4>
          <div className="d-flex flex-column">
            <Radio.Group
              onChange={(e) => {
                setRadio(e.target.value);
              }}
            >
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.arr} className="fc">{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <div>
            <button
              className="btn btn-danger"
              onClick={() => {
                window.location.reload();
              }}
            >
              Remove Filters
            </button>
          </div>
            </div>*/}

        <div className="col-md-12 homeProducts">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap justify-content-center ">
            {products?.map((p) => (
              <>
                <div className="card m-2 homeCards" style={{ width: "18rem" }}>
                  <img
                    src={`https://ecommerce-api-tau-eight.vercel.app/api/v1/products/product-photo/${p._id}`}
                    className="card-img-top cardsImg"
                    
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 20)}...
                    </p>
                    <p className="card-text priceP">₹{p.price}</p>

                    <button
                      className="btn btn-primary ms-1"
                      onClick={() => {
                        navigate(`/product/${p.slug}`);
                      }}
                    >
                      More Details
                    </button>
                    <button
                      className="btn btn-secondary ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem('cart',JSON.stringify([...cart,p]));
                        toast.success("Item added to cart 🎉🎉");
                        
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
          <div className="m-2 p-3 mb-4 text-center align-self-center">
            {products && products.length < total && (
              <button
                className="btn btn-warning "
                onClick={(e) => {
                  e.preventDefault();

                  setPage(page + 1);
                }}
              >
                {load ? "Loading ..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
