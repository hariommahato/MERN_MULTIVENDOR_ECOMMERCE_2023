import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrorsCato,
  updateCategory,
  getCatgoryDetails,
} from "../../actions/categoryAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import SideBar from "./Sidebar";
import { UPDATE_CATEGORY_RESET } from "../../constants/categoryConstants";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCategory = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const alert = useAlert();
  const params = useParams();

  const { error, category } = useSelector((state) => state.categoriesDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.category);

  const [name, setName] = useState("");
  const Id = params.id;
  useEffect(() => {
    if (category && category._id !== Id) {
      dispatch(getCatgoryDetails(Id));
    } else {
      setName(category?.name);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrorsCato());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrorsCato());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/categories");
      dispatch({ type: UPDATE_CATEGORY_RESET });
    }
  }, [dispatch, alert, error, navigate, isUpdated, Id,category, updateError]);

  const UpdateCategorySubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    dispatch(updateCategory(Id, myForm));
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
            onSubmit={UpdateCategorySubmitHandler}
          >
            <h1>Update Category</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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

export default UpdateCategory;
