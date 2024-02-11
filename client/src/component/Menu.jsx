import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/style.css";
import { ShopContext } from "../ShopContext/Shopcontext";
import Avatar from "@mui/joy/Avatar";
import Badge, { badgeClasses } from "@mui/joy/Badge";
import Dropdown from "@mui/joy/Dropdown";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import Axios from "../api/axios";

const Menus = () => {
  const valueContext = useContext(ShopContext);
  console.log('localStorage: ' +valueContext.dataLocalStorage);
  const params = useLocation().pathname;
  const [colorBtn, setColorBtn] = useState(params);
  const logout = async() => {
    Axios.post('/logout/cookie').then((res)=> {
    console.log(res.data)
    window.location.href = "/"
    }
    )
  }

  return (
    <div>
      {/* Topbar Start */}
      <div className="container-fluid">
        <div className="row bg-secondary py-1 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center h-100">
              <a className="text-body mr-3" href>
                IPhone sales everything at -20%
              </a>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              {!valueContext?.user ? (
                <div className="btn-group">
                  <Link to="/login"
                    className="btn btn-sm btn-dark"
                  >
                    Login
                  </Link>
                  <Link to="/register"
                    className="btn btn-sm btn-light"
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <div className="btn-group">
                  <Dropdown>
                    <MenuButton> Welcome, {valueContext.user.FirstName}</MenuButton>
                    <Menu>
                      <Link to="/profile">
                        {" "}
                        <MenuItem>Profile</MenuItem>{" "}
                      </Link>
                      <Link to="/setting">
                      <MenuItem>Change Password</MenuItem>
                      </Link>
                      <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                  </Dropdown>
                  <Badge
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeInset="14%"
                    color="success"
                    sx={{
                      [`& .${badgeClasses.badge}`]: {
                        "&::after": {
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          animation: "ripple 1.2s infinite ease-in-out",
                          border: "2px solid",
                          borderColor: "success.500",
                          content: '""',
                        },
                      },
                      "@keyframes ripple": {
                        "0%": {
                          transform: "scale(1)",
                          opacity: 1,
                        },
                        "100%": {
                          transform: "scale(2)",
                          opacity: 0,
                        },
                      },
                    }}
                  >
                    <Avatar alt="Remy Sharp" src="../img/cat-1.jpg" size="lg" />
                  </Badge>
                </div>
              )}
              {/* <div className="btn-group mx-2">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  data-toggle="dropdown"
                >
                  USD
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <button className="dropdown-item" type="button">
                    EUR
                  </button>
                  <button className="dropdown-item" type="button">
                    GBP
                  </button>
                  <button className="dropdown-item" type="button">
                    CAD
                  </button>
                </div>
              </div>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-sm btn-light dropdown-toggle"
                  data-toggle="dropdown"
                >
                  EN
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <button className="dropdown-item" type="button">
                    FR
                  </button>
                  <button className="dropdown-item" type="button">
                    AR
                  </button>
                  <button className="dropdown-item" type="button">
                    RU
                  </button>
                </div>
              </div> */}
            </div>
            <div className="d-inline-flex align-items-center d-block d-lg-none">
              <a href className="btn px-0 ml-2">
                <i className="fas fa-heart text-dark" />
                <span
                  className="badge text-dark border border-dark rounded-circle"
                  style={{ paddingBottom: 2 }}
                >
                  0
                </span>
              </a>
              <a href className="btn px-0 ml-2">
                <i className="fas fa-shopping-cart text-dark" />
                <span
                  className="badge text-dark border border-dark rounded-circle"
                  style={{ paddingBottom: 2 }}
                >
                  0
                </span>
              </a>
            </div>
          </div>
        </div>
        <div className="row align-items-center bg-light py-3 px-xl-5 d-none d-lg-flex">
          <div className="col-lg-4">
            <a href className="text-decoration-none">
              <span className="h1 text-uppercase text-primary bg-dark px-2">
                Multi
              </span>
              <span className="h1 text-uppercase text-dark bg-primary px-2 ml-n1">
                Shop
              </span>
            </a>
          </div>
          <div className="col-lg-4 col-6 text-left">
            <form action>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products"
                  onChange={(e) => valueContext.setsearch(e.target.value)}
                />
                <div className="input-group-append">
                  <span className="input-group-text bg-transparent text-primary">
                    <i className="fa fa-search" />
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-4 col-6 text-right">
            <p className="m-0">Customer Service</p>
            <h5 className="m-0">TEL : 99 148 651 - 92 229 501</h5>
          </div>
        </div>
      </div>
      {/* Topbar End */}
      {/* Navbar Start */}
      <div className="container-fluid bg-dark mb-30">
        <div className="row px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a
              className="btn d-flex align-items-center justify-content-between bg-primary w-100"
              data-toggle="collapse"
              href="#navbar-vertical"
              style={{ height: 65, padding: "0 30px" }}
            >
              <h6 className="text-dark m-0">
                <i className="fa fa-bars mr-2" />
                Categories
              </h6>
              <i className="fa fa-angle-down text-dark" />
            </a>
            <nav
              className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 bg-light"
              id="navbar-vertical"
              style={{ width: "calc(100% - 30px)", zIndex: 999 }}
            >
              <div className="navbar-nav w-100">
                {/* <div className="nav-item dropdown dropright">
                  <Link
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    Dresses <i className="fa fa-angle-right float-right mt-1" />
                  </Link>
                  <div className="dropdown-menu position-absolute rounded-0 border-0 m-0">
                    <Link
                      to="/shopdetails"
                      state={{ category: "dresses" }}
                      className="dropdown-item"
                    >
                      Women's Dresses
                    </Link>
                    <Link
                      to="/shopdetails"
                      state={{ category: "kidsdresses" }}
                      className="dropdown-item"
                    >
                      Baby's Dresses
                    </Link>
                  </div>
                </div> */}
                <Link to="/shop/Phone" className="nav-item nav-link">
                  Phone
                </Link>
                <Link to="/shop/Laptop" className="nav-item nav-link">
                  Laptop
                </Link>
              </div>
            </nav>
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-3 py-lg-0 px-0">
              <a href className="text-decoration-none d-block d-lg-none">
                <span className="h1 text-uppercase text-dark bg-light px-2">
                  Multi
                </span>
                <span className="h1 text-uppercase text-light bg-primary px-2 ml-n1">
                  Shop
                </span>
              </a>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarCollapse"
              >
                <div className="navbar-nav mr-auto py-0">
                  <Link
                    to="/"
                    className={
                      colorBtn === "/"
                        ? "nav-item nav-link active"
                        : "nav-item nav-link"
                    }
                  >
                    Home
                  </Link>
                  <Link
                    to="/products"
                    className={
                      colorBtn === "/products"
                        ? "nav-item nav-link active"
                        : "nav-item nav-link"
                    }
                  >
                    Shop
                  </Link>
                  {/* <Link to="/detail" className={colorBtn === "/detail" ? "nav-item nav-link active" : "nav-item nav-link"}>
                    Shop Detail
                  </Link>
                   <div className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle active"
                      data-toggle="dropdown"
                    >
                      Pages <i className="fa fa-angle-down mt-1" />
                    </Link>
                    <div className="dropdown-menu bg-primary rounded-0 border-0 m-0">
                      <Link to="/cart" className="dropdown-item">
                        Shopping Cart
                      </Link>
                      <Link to="/checkout" className="dropdown-item">
                        Checkout
                      </Link>
                    </div>
                  </div>  */}
                  <Link
                    to="/cart"
                    className={
                      colorBtn === "/cart"
                        ? "nav-item nav-link active"
                        : "nav-item nav-link"
                    }
                  >
                    Shopping Cart
                  </Link>
                  <Link
                    to="/contact"
                    className={
                      colorBtn === "/contact"
                        ? "nav-item nav-link active"
                        : "nav-item nav-link"
                    }
                  >
                    Contact
                  </Link>
                  {!!valueContext?.user && (
                    <Link
                      to="/order"
                      className={
                        colorBtn === "/order"
                          ? "nav-item nav-link active"
                          : "nav-item nav-link"
                      }
                    >
                      <span className="orderList">Order-List</span>
                    </Link>
                  )}
                </div>
                <div className="navbar-nav ml-auto py-0 d-none d-lg-block">
                  <Link to="/favorite" className="btn px-0">
                    <i className="fas fa-heart text-primary" />
                    <span
                      className="badge text-secondary border border-secondary rounded-circle"
                      style={{ paddingBottom: 2 }}
                    >
                    {/* /*{valueContext?.dataLocalStorage.length} */}
                    {valueContext?.dataLocalStorage ? valueContext.dataLocalStorage.length : 0}

                    </span>
                  </Link>
                  <Link to="/cart" href className="btn px-0 ml-3">
                    <i className="fas fa-shopping-cart text-primary" />
                    <span
                      className="badge text-secondary border border-secondary rounded-circle"
                      style={{ paddingBottom: 2 }}
                    >
                      {/* {valueContext?.cartitems.length} */}
                      {valueContext?.cartitems ? valueContext.cartitems.length : 0}

                    </span>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      {/* Navbar End */}
    </div>
  );
};

export default Menus;
