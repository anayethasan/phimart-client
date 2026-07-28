import { Link, NavLink } from "react-router";
import useAuthContext from "../hook/useAuthContext";
import useCartContext from "../hook/useCartContext";

const navLinkClass = ({ isActive }) =>
  `relative py-1 font-medium transition-colors duration-200 ${
    isActive ? "text-primary" : "text-base-content/70 hover:text-base-content"
  } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-primary after:transition-all after:duration-200 ${
    isActive ? "after:w-full" : "after:w-0 hover:after:w-full"
  }`;
const Navbar = () => {
  const {user, logOutUser} = useAuthContext();
  const {cart} = useCartContext();
  return (
    <div className="navbar bg-base-100 shadow-sm relative z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {user && (
              <Link
                to="/dashboard"
                className="py-1 font-medium text-base-content/70 hover:text-base-content transition-colors duration-200"
              >
                Dashboard
              </Link>
            )}
            <li>
              <NavLink to="/shop">shop</NavLink>
            </li>
            <li>
              <NavLink to="/shop?category=4">Books</NavLink>
            </li>
            <li>
              <NavLink to="/shop?category=2">Fashion</NavLink>
            </li>
            <li>
              <NavLink to="/shop?category=1">Electronics</NavLink>
            </li>
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl">Phimart</NavLink>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            {user && (
              <Link
                to="/dashboard"
                className="py-1 font-medium text-base-content/70 hover:text-base-content transition-colors duration-200"
              >
                Dashboard
              </Link>
            )}
          </li>
          <li>
            <NavLink to="/shop" className={navLinkClass}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop?category=4" >Books</NavLink>
          </li>
          <li>
            <NavLink to="/shop?category=2" >Fashion</NavLink>
          </li>
          <li>
            <NavLink to="/shop?category=1" >Electronics</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {user ? (
        <div>
          <div className="flex-none">
              <div className="dropdown dropdown-end mr-4">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                  <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
                  <span className="badge badge-sm indicator-item">{cart?.items?.length || 0}</span>
                  </div>
              </div>
              <div
                  tabIndex={0}
                  className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                  <div className="card-body">
                  <span className="text-lg font-bold">{cart?.items?.length || 0}   Items</span>
                  <span className="text-info">Subtotal: ${cart?.total_price || 0}</span>
                  <div className="card-actions">
                      <Link to="dashboard/cart/"><button className="btn btn-primary btn-block">View cart</button></Link>
                  </div>
                  </div>
              </div>
              </div>
              <div className="dropdown dropdown-end mr-3">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                  <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
              </div>
              <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                  <li>
                  <Link to="/dashboard/profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                  </Link>
                  </li>
                  <li><a onClick={logOutUser}>Logout</a></li>
              </ul>
              </div>
          </div>
        </div>
        ) : (
          <div className="flex gap-3">
            <Link to={"/login"} className="btn btn-secondary">
              Login
            </Link>
            <Link to={"/register"} className="btn btn-secondary">
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
