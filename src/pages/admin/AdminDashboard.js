import React from 'react'
import Layout from '../../components/layout/layout'
import AdminMenu from '../../components/layout/AdminMenu'
import { useAuth } from '../../context/auth'
const AdminDashboard = () => {
  const [auth]=useAuth();
  return (
    <Layout title={"Admin Dashboard- Ecommerce"}>
<div className='container-fluid m-3 p-3'>
  <div className='row'>
    <div >
<AdminMenu/>
    </div>
    <div className='col-md-9'>

      <div className='card w-75 p-3 adminViews'>

      <h4>Admin Name: {auth?.user?.name}</h4>
      <h4>Admin Email: {auth?.user?.email}</h4>
      <h4>Admin Contact: {auth?.user?.phone}</h4>



      </div>

    </div>
  </div>
</div>
    </Layout>
  )
}

export default AdminDashboard
