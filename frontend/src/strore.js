import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newProductReducer, newReviewReducer, productDetailsReducer, productReviewsReducer, reviewReducer,productReducer, productsReducer, singleuserproductreducer, featuredproductreducer, hotdealproductreducer } from "./reducers/productReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "./reducers/userReducer";
import {cartReducer} from './reducers/cartReducer'
import {categoryDetailsReducer, categoryReducer, newCategoryREducer, updateCategoryReducer} from './reducers/categoryReducer'
import {allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer} from './reducers/orderReducer'
import { carouselDetailReducer, carouselReducer, carouselsReducer, newCarouselReducer } from "./reducers/carouselReducer";
const reducer = combineReducers({
  featuredproduct:featuredproductreducer,
  hotdealproduct:hotdealproductreducer,
  categories:categoryReducer,
  categoriesDetails:categoryDetailsReducer,
  newcategory:newCategoryREducer,
  category:updateCategoryReducer,
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  singleuserproduct:singleuserproductreducer,
  newCarousel:newCarouselReducer,
  carousels:carouselsReducer,
  carouseldetail:carouselDetailReducer,
  carousel:carouselReducer,
});

let initialState = {
  cart:{
    cartItems:localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[],
    shippingInfo:localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")):{}
  }
};
const middleware = [thunk];
const store = legacy_createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
