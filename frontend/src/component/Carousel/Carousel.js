import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./carousel.css";
import { useDispatch, useSelector } from "react-redux";
import { getCarousel } from "../../actions/carouselAction";
const Carousel = () => {
  const dispatch = useDispatch();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    dispatch(getCarousel());
  }, [dispatch]);
  const { error, carousel } = useSelector((state) => state.carousels);
  const carouselData = carousel?.images;
  return (
    <div style={{ width: "80%", margin: "auto" }}>
      {console.log(carousel)}
      <Slider
        {...settings}
        style={{
          width: "100%",
          height: "500px",
        }}
      >
        {carousel &&
          carousel?.map((item) => {
            return item?.images?.map((item) => {
              return (
                <div>
                  <img src={item?.url} className="carouselImg" alt="c" />
                  
                </div>
              );
            });
          })}
      </Slider>
    </div>
  );
};

export default Carousel;
