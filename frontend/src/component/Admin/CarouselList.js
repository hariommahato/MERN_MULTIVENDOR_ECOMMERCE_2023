import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getCarousel,
  deletCarousel,
} from "../../actions/carouselAction";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Box, Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import { DELETE_CAROUSEL_RESET } from "../../constants/carousel";

const CarouseList = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { error, carousel } = useSelector((state) => state.carousels);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.carousel
  );

  const deleteProductHandler = (id) => {
    dispatch(deletCarousel(id));
    alert.success("Deleted Successfully");
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_CAROUSEL_RESET });
    }

    dispatch(getCarousel());
  }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

  const columns = [
    { field: "id", headerName: "Carousel ID", minWidth: 200, flex: 0.5 },
    {
      field: "Image",
      headerName: "Image",
      type: "String",
      minWidth: 100,
      flex: 0.3,
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
            <Link to={`/admin/carousel/edit/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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
  carousel &&
    carousel.forEach((item) => {
      rows.push({
        id: item._id,
        Image: item.images[0]?.url
      });
    });
  return (
    <Fragment>
      <MetaData title={`ALL Carousel - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL CAROUSEL</h1>
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

export default CarouseList;
