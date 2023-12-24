import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/layout";
import moment from "moment";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { Select } from "antd";
const { Option } = Select;

const AdminOrder = () => {
  const [status, setStatus] = useState([
    "Not process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        "https://ecommerce-api-bay-three.vercel.app/api/v1/auth/all-orders"
      );
      console.log(data);
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `https://ecommerce-api-bay-three.vercel.app/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      getOrders();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Layout>
      <div className="row ">
        <div >
          <AdminMenu />
        </div>
        <div className="col-md-8 adminViews">
          <h1 className="text-center">All Orders</h1>
          {orders?.map((o, i) => {
            console.log(o.products);
            return (
              <>
                <div className="border">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>

                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.statue}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o.buyer.name}</td>
                        <td>{moment(o.createdAt).fromNow()}</td>
                        <td>{o.payment.success ? "Success" : "Fail"}</td>
                        <td>{o.products.length}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-md-8">
                      {o?.products?.map((p, i) => (
                        <div className="row mb-2 card flex-row p-3">
                          <div className="col-md-4">
                            <img
                              src={`/api/v1/products/product-photo/${p._id}`}
                              className="card-img-top"
                              alt="..."
                              width={"100px"}
                              height={"100px"}
                            />
                          </div>
                          <div className="col-md-8">
                            <h4>{p.name}</h4>
                            <p>{p.description.substring(0, 30)}</p>
                            <p>Price: {p.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrder;
