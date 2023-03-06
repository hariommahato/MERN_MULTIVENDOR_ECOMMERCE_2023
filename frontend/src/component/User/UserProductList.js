import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./productList.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, deleteProduct, getSingleUserProduct } from "../../actions/productActions";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Box, Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import UserSidebar from "./UserSidebar";
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";

const UserProductList = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, error } = useSelector((state) => state.singleuserproduct);
  const { user } = useSelector((state) => state.user);
  const userId=user?._id

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  const alert = useAlert();

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
    alert.success("Deleted Successfully");
  };

  useEffect(() => {
    if (error) {
      // alert.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      alert.success("Product Deleted Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
    dispatch(getSingleUserProduct(userId))
  }, [dispatch, alert, error, deleteError, navigate, isDeleted,userId]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 200,
      flex: 0.5,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
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
            <Link to={`/user/product/${params.getValue(params.id, "id")}`}>
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

  product &&
    product.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });

  return (
    <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <UserSidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
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

export default UserProductList;
