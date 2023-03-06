import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./categoryList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrorsCato,
  getAllCategory,
  deleteCategory,
} from "../../actions/categoryAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Box, Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_CATEGORY_RESET } from "../../constants/categoryConstants";

const ProductList = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const alert = useAlert();

  const { error, category } = useSelector((state) => state.categories);

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.category
  );
 

  const deleteCategoryHandler = (id) => {
    dispatch(deleteCategory(id));
    alert.success("Deleted Successfully");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrorsCato());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrorsCato());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_CATEGORY_RESET });
    }

    dispatch(getAllCategory());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/category/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteCategoryHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  category &&
    category.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL CATEGORY - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL CATEGORY</h1>
          <Box sx={{ width: "100%", overflow: "auto" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              // pageSize={15}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          </Box>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
