import React from 'react'

const CategoryForm = ({handleSubmit,value,setValue}) => {
  return (
    <div>
      <h1>Category Form</h1>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <input type="text" className="form-control" placeholder='Enter new category' value={value}  onChange={(e)=>{setValue(e.target.value)}}/>
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default CategoryForm;
