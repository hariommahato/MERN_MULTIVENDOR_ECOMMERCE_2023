import "./App.css";
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./strore";
import { loadUser } from "./actions/userActions";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrder";
import OrderDetails from "./component/Order/OrderDetails";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
// import Contact from "./component/layout/Contact/Contact";
// import About from "./component/layout/About/About";
import NotFound from "./component/layout/NotFound/NotFound";
import PostProduct from "./component/SingleUser/PostProduct";
import MyProduct from "./component/SingleUser/MyProduct";
import EditMyproduct from "./component/SingleUser/EditMyproduct";
import NewCategory from "./component/Admin/NewCategory";
import CategoryList from "./component/Admin/CategoryList";
import UpdateCategory from "./component/Admin/UpdateCategory.js";
import UserDashboard from "./component/User/UserDashboard";
import UserProductList from "./component/User/UserProductList";
import UserNewProduct from "./component/User/UserNewPorduct";
import UserUpdateProduct from "./component/User/UserUpdateProduct";
import CarouseList from "./component/Admin/CarouselList";
import NewCarousel from "./component/Admin/NewCarousel";
import UpdateCarousel from "./component/Admin/UpdateCarousel";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);
  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        {stripeApiKey && (
          <Route
            exact
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute component={Payment}></ProtectedRoute>
              </Elements>
            }
          />
        )}
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/search" element={<Search />} />
        {/* <Route exact path="/contact" element={Contact} /> */}
        {/* <Route exact path="/about" element={About} /> */}
        <Route
          exact
          path="/me/update"
          element={<ProtectedRoute component={UpdateProfile}></ProtectedRoute>}
        />
        <Route
          exact
          path="/account"
          element={<ProtectedRoute component={Profile}></ProtectedRoute>}
        />
        <Route
          exact
          path="/password/update"
          element={<ProtectedRoute component={UpdatePassword} />}
        />
        <Route
          exact
          path="/user/dashboard"
          element={<ProtectedRoute component={UserDashboard} />}
        />
        <Route exact path="/password/forgot" element={ForgotPassword} />
        <Route exact path="/password/reset/:token" element={ResetPassword} />
        <Route exact path="/cart" element={<Cart />} />
        <Route
          exact
          path="/shipping"
          element={<ProtectedRoute component={Shipping}></ProtectedRoute>}
        />
        <Route
          exact
          path="/success"
          element={<ProtectedRoute component={OrderSuccess}></ProtectedRoute>}
        />
        <Route
          exact
          path="/orders"
          element={<ProtectedRoute component={MyOrders}></ProtectedRoute>}
        />
        <Route
          exact
          path="/order/confirm"
          element={<ProtectedRoute component={ConfirmOrder}></ProtectedRoute>}
        />
        <Route
          exact
          path="/order/:id"
          element={<ProtectedRoute component={OrderDetails}></ProtectedRoute>}
        />
        <Route
          exact
          path="/admin/dashboard"
          element={
            <ProtectedRoute
              isAdmin={true}
              component={Dashboard}
            ></ProtectedRoute>
          }
        />
        <Route exact path="/admin/carousels" element={<CarouseList />} />
        <Route exact path="/admin/carousel" element={<NewCarousel />} />
        <Route
          exact
          path="/admin/carousel/edit/:id"
          element={<UpdateCarousel />}
        />
        <Route
          exact
          path="/admin/products"
          element={
            <ProtectedRoute
              isAdmin={true}
              component={ProductList}
            ></ProtectedRoute>
          }
        />
        <Route
          exact
          path="/user/products"
          element={
            <ProtectedRoute component={UserProductList}></ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/categories"
          element={
            <ProtectedRoute
              isAdmin={true}
              component={CategoryList}
            ></ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/product"
          element={
            <ProtectedRoute
              isAdmin={true}
              component={NewProduct}
            ></ProtectedRoute>
          }
        />
        <Route
          exact
          path="/user/product"
          element={<ProtectedRoute component={UserNewProduct}></ProtectedRoute>}
        />
        <Route
          exact
          path="/admin/category"
          element={
            <ProtectedRoute
              isAdmin={true}
              component={NewCategory}
            ></ProtectedRoute>
          }
        />
        <Route
          exact
          path="/addproduct"
          element={<ProtectedRoute component={PostProduct}></ProtectedRoute>}
        />
        <Route
          exact
          path="/myproduct"
          element={<ProtectedRoute component={MyProduct}></ProtectedRoute>}
        />
        <Route
          exact
          path="/editmyproduct/:id"
          element={<ProtectedRoute component={EditMyproduct}></ProtectedRoute>}
        />
        <Route
          exact
          path="/admin/product/:id"
          element={
            <ProtectedRoute
              isAdmin={true}
              component={UpdateProduct}
            ></ProtectedRoute>
          }
        />
        <Route
          exact
          path="/user/product/:id"
          element={
            <ProtectedRoute component={UserUpdateProduct}></ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/category/:id"
          element={
            <ProtectedRoute
              isAdmin={true}
              component={UpdateCategory}
            ></ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/orders"
          element={
            <ProtectedRoute
              isAdmin={true}
              component={OrderList}
            ></ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/order/:id"
          element={
            <ProtectedRoute
              isAdmin={true}
              component={ProcessOrder}
            ></ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/users"
          element={
            <ProtectedRoute
              isAdmin={true}
              component={UsersList}
            ></ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/user/:id"
          element={
            <ProtectedRoute
              isAdmin={true}
              component={UpdateUser}
            ></ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/reviews"
          element={
            <ProtectedRoute
              isAdmin={true}
              component={ProductReviews}
            ></ProtectedRoute>
          }
        />
        <Route
          element={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />{" "}
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
