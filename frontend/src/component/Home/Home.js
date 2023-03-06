import React, { Fragment, useEffect } from "react";
import "./Home.css";
// import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import {
  clearErrors,
  getFeaturedProducts,
  getHotDealProduct,
} from "../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import Carousel from "../Carousel/Carousel";
import FeaturedProduct from "../Carousel/FeaturedProduct/FeaturedProduct";
import { Typography } from "@material-ui/core";
import HotDealProduct from "../Carousel/HotDealProduct/HotDealProduct";
import TopProduct from "../Carousel/TopProduct/TopProduct";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    // dispatch(getProduct());
    dispatch(getFeaturedProducts());
    dispatch(getHotDealProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
    
        <MetaData title={"Home"}/>
          <Carousel />
          <div style={{ width: "80%", margin: "auto", marginTop: "4rem" }}>
            <Typography variant="h6">Top Product</Typography>
            <TopProduct />
          </div>

          <div style={{ width: "80%", margin: "auto", marginTop: "4rem" }}>
            <Typography variant="h6">Featured Product</Typography>
            <FeaturedProduct />
          </div>
          <div style={{ width: "80%", margin: "auto", marginTop: "4rem" }}>
            <Typography variant="h6">Featured Product</Typography>
            <HotDealProduct />
          </div>
        </Fragment>

  )
};

export default Home;
