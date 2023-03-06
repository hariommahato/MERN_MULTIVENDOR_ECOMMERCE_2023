import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  updateCarousel,
  getCarouselDetail,
} from "../../actions/carouselAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { UPDATE_CAROUSEL_RESET } from "../../constants/carousel";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCarousel = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const alert = useAlert();
  const params = useParams();

  const { error, carousel } = useSelector((state) => state.carouseldetail);

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.carousel);
 
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const carouselId = params.id;

  useEffect(() => {
    if (carousel && carousel._id !== carouselId) {
      dispatch(getCarouselDetail(carouselId));
    } else {
      setOldImages(carousel?.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Carousel Updated Successfully");
      navigate("/admin/carousels");
      dispatch({ type: UPDATE_CAROUSEL_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    carouselId,
    carousel,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateCarousel(carouselId, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    // setImages([]);
    // setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };


  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Carousel</h1>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateCarousel;
