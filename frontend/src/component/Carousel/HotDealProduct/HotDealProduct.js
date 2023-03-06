import { Card, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { useAlert } from "react-alert";
import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick";
const HotDealProduct = () => {
  const alert=useAlert()
  const {  error, products } = useSelector(
    (state) => state.hotdealproduct
  );
  useEffect(()=>{
    if(error){
      alert.error(Error)
    }

  },[error,alert])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    autoplay:true,
    autoplaySpeed: 3000,
    slidesToScroll: 4,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div>
  
      <Slider {...settings} style={{ height: "auto" }}>
        {products &&
          products.map((product) => (
            <div key={product._id}>
              <Link to={`/product/${product._id}`} style={{textDecoration:"none"}}>
                <Card style={{height:"15rem",width:"14rem"}} elevation={3}>
                  <img src={product.images[0].url} style={{height:"10rem",width:"100%",padding:"0.5rem"}} alt="product"/>
                  <Typography style={{margin:"0.3rem 0.3rem"}}>{` ${product.name}`}</Typography>
                  <Typography style={{margin:"0.3rem 0.3rem",color:"tomato"}}>{`Rs ${product.price}`}</Typography>
                </Card>
              </Link>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default HotDealProduct;
