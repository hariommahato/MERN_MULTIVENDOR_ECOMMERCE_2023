import React, { Fragment, useEffect, useState } from "react";
import "./category.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrorsCato, createCategory } from "../../actions/categoryAction";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import SideBar from "./Sidebar";
import { NEW_CATEGORY_RESET } from "../../constants/categoryConstants";
import { useNavigate } from "react-router-dom";

const NewCategory = () => {
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newcategory);

  const [name, setName] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrorsCato());
    }

    if (success) {
      alert.success("Category Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_CATEGORY_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  const createCategoryHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);

    dispatch(createCategory(myForm));
  };

  return (
    <Fragment>
      <MetaData title="Create Category" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form className="createProductForm" onSubmit={createCategoryHandler}>
            <h1>Create Category</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder=" Category"
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

export default NewCategory;
