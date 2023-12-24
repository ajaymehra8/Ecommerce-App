import React from "react";
import { useSearch } from "../../context/search";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate=useNavigate();

  const handleClick=async(e)=>{
e.preventDefault();
try{
const {data}=await axios.get(`https://ecommerce-api-bay-three.vercel.app/api/v1/products/search/${values.keyword}`);
setValues({...values,result:data});
navigate("/search")
}catch(error){
    console.log(error);
}
  }

  return (
    <div>
      <form className="d-flex">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e)=>{
            setValues({...values,keyword:e.target.value})
          }}
        />
        <button className="btn btn-outline-success" type="submit" onClick={handleClick}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchInput;
