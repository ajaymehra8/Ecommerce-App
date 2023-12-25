import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Select } from "antd";
const { Option } = Select;

const Createproduct = () => {
    const auth=useAuth();
    const navigate=useNavigate();
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [category, setCategory] = useState("");

  //getting all category

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://ecommerce-api-tau-eight.vercel.app/api/v1/category/categories");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

//Create product function

const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append('name', name);
      productData.append('description', description);
      productData.append('price', price);
      productData.append('photo', photo);
      productData.append('quantity', quantity);
      productData.append('category', category);
  
      console.log(productData);
  
      const { data } = await axios.post("https://ecommerce-api-tau-eight.vercel.app/api/v1/products/create-product", productData, {
        headers: {
          Authorization: auth[0]?.token, // Assuming your JWT is stored in auth.token
          // Include any other headers you need
          'Content-Type': 'multipart/form-data', // Make sure to set the content type for FormData
        },
      });
  
      if (data?.success) {
        toast.success("Product created successfully");
        navigate("/");
      } else {
        toast.error("Error in creation of product");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in product creation");
    }
  };
  

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div>
            <AdminMenu />
          </div>
          <div className="col-md-9 adminViews">
            <h2> Create product</h2>
            <div className="m-1">
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3 w-75"
                onChange={(value) => {
                  setCategory(value);
                }}
              >
                {categories?.map((c) => {
                  return (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  );
                })}
              </Select>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-9">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="phot"
                    accept="image/*"
                    onChange={(e) => {
                      setPhoto(e.target.files[0]);
                    }}
                    hidden
                  />
                </label>
              </div>

              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Product photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>

              <div className="mb-3 w-75">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3 w-75">
                <input
                  type="text"
                  value={quantity}
                  placeholder="Enter Quantity"
                  className="form-control"
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3 w-75">
                <input
                  type="text"
                  value={price}
                  placeholder="Enter Price"
                  className="form-control"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>

              <div className="mb-3 w-75">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Enter Description"
                  className="form-control"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>

                <Select
                   bordered={false}
                   placeholder="Select a category"
                   size="large"
                   showSearch
                   className="form-select mb-3 w-75"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                    <Option value="0">Yes</Option>
                    <Option value="1">No</Option>

                </Select>
              

<div className="mb-3" >
<button className="btn btn-primary" onClick={handleCreate}>
Create Product
</button>
</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Createproduct;
