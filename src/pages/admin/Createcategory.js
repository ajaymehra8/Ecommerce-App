import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/form/categoryForm";
import { useAuth } from "../../context/auth";
import { Modal } from "antd";

const Createcategory = () => {
  const [categories, setCategories] = useState([]);
  const [open, setopen] = useState(false);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const auth = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name);
    console.log(auth);
    try {
      console.log("'hello");
      const { data } = await axios.post(
        "https://ecommerce-api-tau-eight.vercel.app/api/v1/category/create-category",
        { name },
        {
          headers: {
            Authorization: auth[0]?.token, // Assuming your JWT is stored in auth.token
            // Include any other headers you need
          },
        }
      );
      console.log(data);
      if (data?.success) {
        toast.success(data.message);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("https://ecommerce-api-tau-eight.vercel.app/api/v1/category/categories");
      console.log(data);
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

  //handle update

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://ecommerce-api-tau-eight.vercel.app/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }, {
          headers: {
            Authorization: auth[0]?.token, // Assuming your JWT is stored in auth.token
            // Include any other headers you need
          },
        }
      );
      console.log(res.data);
      if (res?.data?.success) {
        toast.success(res.data.message);
        setSelected(null);
        setUpdatedName("");
        setopen(false);
        getAllCategory();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in handleUpdate");
    }
  };

//handle delete

const handleDelete = async (id) => {
  try {
    const res = await axios.delete(
      `https://ecommerce-api-tau-eight.vercel.app/api/v1/category/delete-category/${id}`, {
        headers: {
          Authorization: auth[0]?.token, // Assuming your JWT is stored in auth.token
          // Include any other headers you need
        },
      }
    );
    if (res?.data?.success) {
      toast.success(res.data.message);
      getAllCategory();
    } else {
      toast.error(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong in handleUpdate");
  }
};

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h4>Manage category</h4>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => {
                    return (
                      <>
                        <tr>
                          <td key={c.id}>{c.name}</td>
                          <td>
                            <button
                              className="btn btn-primary ms-2"
                              onClick={() => {
                                setopen(true);
                                setUpdatedName(c.name);
                                setSelected(c);
                              }}
                            >
                              Edit
                            </button>
                            <button className="btn btn-danger ms-2" onClick={()=>{handleDelete(c._id)}}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setopen(false)}
              footer={null}
              open={open}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Createcategory;
