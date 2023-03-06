import React, { useEffect } from "react";
import UserSidebar from "./UserSidebar.js";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useSelector, useDispatch } from "react-redux";
import { getSingleUserProduct } from "../../actions/productActions";
import MetaData from "../layout/MetaData";
Chart.register(...registerables);

const UserDashboard = () => {
  const dispatch = useDispatch();
  // const navigate=useNavigate()
  const { product } = useSelector((state) => state.singleuserproduct);
  const { user } = useSelector((state) => state.user);

  let outOfStock = 0;

  product &&
    product.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getSingleUserProduct(user?._id));
  }, [dispatch, user]);

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, product?.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <UserSidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          {/* <div>
            <p>
              Total Amount <br /> ₹{totalAmount}
            </p>
          </div> */}
          <div className="dashboardSummaryBox2">
            <Link to="/user/products">
              <p>Product</p>
              <p>{product && product.length}</p>
            </Link>
          </div>
        </div>

        {/* <div className="lineChart">
          <Line data={lineState} />
        </div> */}

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
