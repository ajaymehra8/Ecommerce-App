import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../form/searchInput";
import { useCart } from "../../context/cart";
import useCategory from "../../hooks/useCategory";
import { Badge } from "antd";
const Header = () => {
  const [cart]=useCart();
  const [auth, setAuth] = useAuth();
  const category = useCategory();
  const handleLogout = () => {
    setAuth((auth) => ({
      ...auth,
      user: null,
      token: null,
    }));
    localStorage.removeItem("auth");
    setTimeout(() => {
      toast.success("Logout successfully");
    }, 1000);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light myNavbar">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              🛒 Ecommerce App
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 navLists">
              <SearchInput />
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/categories"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                
                <ul className="dropdown-menu">
                
                  {category?.map((c) => (
                    <li key={c.id}>
                      <Link className="dropdown-item" to={`/category/${c.slug}`}>
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      Sign up
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Log in
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                  <NavLink
  className="nav-link dropdown-toggle"
  to="/dashboard"
  id="navbarDropdown"
  role="button"
  data-bs-toggle="dropdown"
  aria-expanded="false"
>
  {auth?.user?.name}
</NavLink>

                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item"
                          to="/login"
                          onClick={handleLogout}
                        >
                          Log out
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              <li className="nav-item" style={{ display: 'flex', alignItems: 'center' }}>
                <Badge count={cart?.length} showZero>
                <NavLink className="nav-link" to="/cart">
                  Cart
                </NavLink>
                </Badge>
               
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
