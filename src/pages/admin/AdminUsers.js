import React from 'react'
import Layout from '../../components/layout/layout'
import AdminMenu from '../../components/layout/AdminMenu'

const AdminUsers = () => {
  return (
    <Layout>
        <div className='container-fluid m-3 p-3'>

<div className='row'>
    <div className='col-md-3'>
<AdminMenu/>
    </div>
    <div className='col-md-9'>
        <h4>All users</h4>
    </div>
</div>
</div>
    </Layout>
  )
}

export default AdminUsers
