import {
    ALL_CAROUSEL_FAIL,
    ALL_CAROUSEL_REQUEST,
    ALL_CAROUSEL_SUCCESS,
    NEW_CAROUSEL_FAIL,
    NEW_CAROUSEL_REQUEST,
    NEW_CAROUSEL_RESET,
    NEW_CAROUSEL_SUCCESS,
    UPDATE_CAROUSEL_FAIL,
    UPDATE_CAROUSEL_REQUEST,
    UPDATE_CAROUSEL_RESET,
    UPDATE_CAROUSEL_SUCCESS,
    DELETE_CAROUSEL_REQUEST,
    DELETE_CAROUSEL_FAIL,
    DELETE_CAROUSEL_RESET,
    DELETE_CAROUSEL_SUCCESS,
    CAROUSEL_DETAILS_FAIL,
    CAROUSEL_DETAILS_REQUEST,
    CAROUSEL_DETAILS_SUCCESS,
    CLEAR_CAROUSEL_ERRORS,
  } from "../constants/carousel";
  
  export const carouselsReducer = (state = { carousel: [] }, action) => {
    switch (action.type) {
      case ALL_CAROUSEL_REQUEST:
        return {
          loading: true,
          carousel: [],
        };
      case ALL_CAROUSEL_SUCCESS:
        return {
          loading: false,
          carousel: action.payload.carousel,
        };
  
      case ALL_CAROUSEL_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_CAROUSEL_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const newCarouselReducer = (state = { carousel: {} }, action) => {
    switch (action.type) {
      case NEW_CAROUSEL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case NEW_CAROUSEL_SUCCESS:
        return {
          loading: false,
          success: action.payload.success,
          carousel: action.payload.carousel,
        };
      case NEW_CAROUSEL_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case NEW_CAROUSEL_RESET:
        return {
          ...state,
          success: false,
        };
      case CLEAR_CAROUSEL_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const carouselReducer = (state = {}, action) => {
    switch (action.type) {
      case DELETE_CAROUSEL_REQUEST:
      case UPDATE_CAROUSEL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case DELETE_CAROUSEL_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_CAROUSEL_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
      case DELETE_CAROUSEL_FAIL:
      case UPDATE_CAROUSEL_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case DELETE_CAROUSEL_RESET:
        return {
          ...state,
          isDeleted: false,
        };
      case UPDATE_CAROUSEL_RESET:
        return {
          ...state,
          isUpdated: false,
        };
      case CLEAR_CAROUSEL_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const carouselDetailReducer = (state = { carousel: {} }, action) => {
    switch (action.type) {
      case CAROUSEL_DETAILS_REQUEST:
        return {
          loading: true,
          ...state,
        };
      case CAROUSEL_DETAILS_SUCCESS:
        return {
          loading: false,
          carousel: action.payload.carousel,
        };
      case CAROUSEL_DETAILS_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_CAROUSEL_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  