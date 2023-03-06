import axios from "axios";

import {
  ALL_CAROUSEL_FAIL,
  ALL_CAROUSEL_REQUEST,
  ALL_CAROUSEL_SUCCESS,
  NEW_CAROUSEL_FAIL,
  NEW_CAROUSEL_REQUEST,
 
  NEW_CAROUSEL_SUCCESS,
  UPDATE_CAROUSEL_FAIL,
  UPDATE_CAROUSEL_REQUEST,

  UPDATE_CAROUSEL_SUCCESS,
  DELETE_CAROUSEL_FAIL,
  DELETE_CAROUSEL_REQUEST,
 
  DELETE_CAROUSEL_SUCCESS,
  CAROUSEL_DETAILS_FAIL,
  CAROUSEL_DETAILS_REQUEST,
  CAROUSEL_DETAILS_SUCCESS,
  CLEAR_CAROUSEL_ERRORS,
} from "../constants/carousel";

export const getCarousel = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_CAROUSEL_REQUEST });

    const { data } = await axios.get("/api/v1/carousel");

    dispatch({
      type: ALL_CAROUSEL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_CAROUSEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const createCarousel = (carouselData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_CAROUSEL_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(`/api/v1/carousel/new`, carouselData, config);
    
    dispatch({
      type: NEW_CAROUSEL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_CAROUSEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateCarousel = (id, carouseldata) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_CAROUSEL_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.put(`/api/v1/carousel/${id}`, carouseldata, config);

    dispatch({
      type: UPDATE_CAROUSEL_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_CAROUSEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deletCarousel = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_CAROUSEL_REQUEST });

    const { data } = await axios.delete(`/api/v1/carousel/${id}`);

    dispatch({
      type: DELETE_CAROUSEL_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: DELETE_CAROUSEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getCarouselDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: CAROUSEL_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/carousel/${id}`);

    dispatch({
      type: CAROUSEL_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAROUSEL_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_CAROUSEL_ERRORS });
};
