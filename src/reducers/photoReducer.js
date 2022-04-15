//// Create constant
export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';
export const SET_AUTH = 'SET_AUTH';
export const OFF_AUTH = 'OFF_AUTH';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const REGISTER_OFF = 'REGISTER_OFF';
export const LOGIN_OFF = 'LOGIN_OFF';
export const ADD_SUCCESS = 'ADD_SUCCESS';
export const REMOVE_ADD_SUCCESS = 'REMOVE_ADD_SUCCESS';
export const EDIT_SUCCESS = 'EDIT_SUCCESS';
export const REMOVE_EDIT_SUCCESS = 'REMOVE_EDIT_SUCCESS';

export const GET_USER = 'GET_USER';
export const GET_PHOTOS = 'GET_PHOTOS';
export const GET_PHOTO = 'GET_PHOTO';

export const SET_TOTAL_PHOTOS = 'SET_TOTAL_PHOTOS';
export const SET_PAGE = 'SET_PAGE';
export const SET_LIMIT_PHOTOS = 'SET_LIMIT_PHOTOS';
export const SET_CURRENT_PAGE_PATH = 'SET_CURRENT_PAGE_PATH';

// Create reducer
export const photoReducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_PAGE_PATH:
      return {
        ...state,
        currentPagePath: action.payload,
      };

    case SET_LIMIT_PHOTOS:
      return {
        ...state,
        limitPhotos: action.payload,
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    case SET_TOTAL_PHOTOS:
      return {
        ...state,
        totalPhotos: action.payload,
      };

    case GET_PHOTOS:
      return {
        ...state,
        photos: action.payload,
        isLoading: false,
      };

    case GET_PHOTO:
      return {
        ...state,
        photo: action.payload,
        isLoading: false,
      };

    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };

    case EDIT_SUCCESS:
      return {
        ...state,
        editSuccess: true,
      };

    case REMOVE_EDIT_SUCCESS:
      return {
        ...state,
        editSuccess: false,
      };

    case ADD_SUCCESS:
      return {
        ...state,
        addSuccess: true,
      };

    case REMOVE_ADD_SUCCESS:
      return {
        ...state,
        addSuccess: false,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: true,
      };

    case REGISTER_OFF:
      return {
        ...state,
        registerSuccess: false,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loginSuccess: true,
      };

    case LOGIN_OFF:
      return {
        ...state,
        loginSuccess: false,
      };

    case SET_AUTH:
      return {
        ...state,
        isAuth: true,
      };

    case OFF_AUTH:
      return {
        ...state,
        isAuth: false,
      };

    case SHOW_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case HIDE_LOADING:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};
