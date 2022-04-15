import {
  createContext,
  useContext,
  useEffect,
  // useState,
  useReducer,
} from 'react';

// Antd
import { notification } from 'antd';

// API
import API from 'apis/api';

// Services
import httpRequest from 'services/httpRequest';

// Reducer
import {
  photoReducer,
  SHOW_LOADING,
  HIDE_LOADING,
  SET_AUTH,
  OFF_AUTH,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  REGISTER_OFF,
  LOGIN_OFF,
  GET_USER,
  GET_PHOTOS,
  GET_PHOTO,
  SET_TOTAL_PHOTOS,
  SET_PAGE,
  SET_LIMIT_PHOTOS,
  // SET_CURRENT_PAGE_PATH,
  ADD_SUCCESS,
  REMOVE_ADD_SUCCESS,
  EDIT_SUCCESS,
  REMOVE_EDIT_SUCCESS,
} from 'reducers/photoReducer';

// context name PascalCase
const PhotoContext = createContext();

const PhotoProvider = ({ children }) => {
  // InitialState
  const initialState = {
    user: {},
    photos: [],
    photo: {},
    isAuth: false,
    isLoading: false,
    registerSuccess: false,
    loginSuccess: false,
    addSuccess: false,
    editSuccess: false,
    // totalDisplayPage: null, //// Math.ceil(res.data.total / res.data.limit) => to output manual totalDisplayPage
    totalPhotos: null,
    page: 1,
    limitPhotos: 10,
    // currentPagePath: '',
  };

  const [state, dispatch] = useReducer(photoReducer, initialState);

  // Show / hide loading action
  const showLoading = () => dispatch({ type: SHOW_LOADING });
  const hideLoading = () => dispatch({ type: HIDE_LOADING });

  // Set login / register  SUCCESS
  const setLoginSuccess = () => dispatch({ type: LOGIN_SUCCESS });
  const unsetLoginSuccess = () => dispatch({ type: LOGIN_OFF });
  const setRegisterSuccess = () => dispatch({ type: REGISTER_SUCCESS });
  const unsetRegisterSuccess = () => dispatch({ type: REGISTER_OFF });

  // Set add/ edit SUCCESS
  const setAddSuccess = () => dispatch({ type: ADD_SUCCESS });
  const unsetAddSuccess = () => dispatch({ type: REMOVE_ADD_SUCCESS });
  const setEditSuccess = () => dispatch({ type: EDIT_SUCCESS });
  const unsetEditSuccess = () => dispatch({ type: REMOVE_EDIT_SUCCESS });

  // Set isAuth
  const setIsAuth = () => dispatch({ type: SET_AUTH });
  const unsetIsAuth = () => dispatch({ type: OFF_AUTH });

  // Set User
  const setUser = (dataUser) => dispatch({ type: GET_USER, payload: dataUser });
  const unsetUser = (empty = {}) =>
    dispatch({ type: GET_USER, payload: empty });

  //// Set photos /photo
  const setPhotos = (data) => dispatch({ type: GET_PHOTOS, payload: data });
  const setPhoto = (data = {}) => dispatch({ type: GET_PHOTO, payload: data });

  //// Set path
  // const setCurrentPagePath = (pathName) =>
  //   dispatch({ type: SET_CURRENT_PAGE_PATH, payload: pathName });

  //// Pagination
  const setTotalPhotos = (totalPhotos) =>
    dispatch({ type: SET_TOTAL_PHOTOS, payload: totalPhotos });
  const setPage = (page = 1) => dispatch({ type: SET_PAGE, payload: page });
  const setLimitPhotos = (limit = 10) =>
    dispatch({ type: SET_LIMIT_PHOTOS, payload: limit });

  const token = sessionStorage.getItem('token');
  // console.log('token o context: ', token);

  //// Notification toast
  const openNotificationWithIcon = (type, title, msgDesc) => {
    notification[type]({
      message: title,
      description: msgDesc,
      duration: 3,
    });
  };

  //// Register
  const register = async (data) => {
    showLoading();

    try {
      const res = await httpRequest.post(API + '/api/user/register', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log('res register: ', res);

      if (res.data.isSucess) {
        //// server define
        openNotificationWithIcon('success', 'Successful!', res.data.msg);
        // console.log('co chay register success');

        setRegisterSuccess();
      }
      hideLoading();
    } catch (error) {
      // console.log('error: ', error.response); //// for more
      const responseMsg = error.response.data.msg;
      openNotificationWithIcon('error', 'Registration Error', responseMsg);
      hideLoading();
    }
  };

  //// Login
  const login = async (data) => {
    showLoading();

    try {
      const res = await httpRequest.post(API + '/api/user/login', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // console.log('res login: ', res); //// for more

      if (res.data.isSucess) {
        //// server define
        openNotificationWithIcon('success', 'Successful!', res.data.msg);
        // console.log('co chay login success');
        sessionStorage.setItem('token', res.data.token);
        setLoginSuccess();
      }

      hideLoading();
    } catch (error) {
      // console.log('error login: ', error.response); //// for more
      const responseMsg = error.response.data.msg;
      openNotificationWithIcon('error', 'Login Error', responseMsg);
      hideLoading();
    }
  };

  //// Authentication
  const authenticate = async (token) => {
    showLoading();

    try {
      const res = await httpRequest.post(
        API + '/api/auth',
        {},
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );
      // console.log('res authen: ', res);

      if (!res.data.isSuccess) {
        unsetIsAuth();
        unsetLoginSuccess();
        hideLoading();
        return;
      }

      setIsAuth();
      setUser(res.data.user.user);
      hideLoading();

      return res;
    } catch (error) {
      console.log('error authen: ', error.response); //// For more
      openNotificationWithIcon('error', 'Access Denied!', 'Unauthorized user');
      hideLoading();
    }
  };

  //// Get all photos
  const getAllPhotos = async (token, page = 1, limit = 10) => {
    showLoading();

    try {
      const res = await httpRequest.get(
        API + `/api/photo?page=${page}&limit=${limit}`,
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );

      // console.log('res photo context: ', res);
      // console.log('photos ra chua ma: ', res.data.data);

      const allPhotos = res.data.data;
      // console.log('clone ra ne: ', allPhotos);

      // setPhotos(res.data.data);
      setPhotos(allPhotos);
      setTotalPhotos(res.data.total);

      hideLoading();
    } catch (error) {
      hideLoading();
      console.log('run error get photos'); //// For more
      console.log('error photoS: ', error.response); //// for more
    }
  };

  const getPhoto = async (token, photoId) => {
    // showLoading();

    try {
      const res = await httpRequest.get(API + `/api/photo/${photoId}`, {
        headers: {
          'x-auth-token': token,
        },
      });

      // console.log('res 1 photo context: ', res);
      setPhoto(res.data.data);

      hideLoading();
    } catch (error) {
      console.log('error photo: ', error.response); //// for more
      hideLoading();
    }
  };

  const addPhoto = async (token, bodyData) => {
    showLoading();

    try {
      const res = await httpRequest.post(API + `/api/photo`, bodyData, {
        headers: {
          'x-auth-token': token,
        },
      });

      // console.log('res addPhoto: ', res);
      // condition
      if (res.data.isSucess) {
        openNotificationWithIcon(
          'success',
          'New Photo have been added!',
          res.data.msg
        );
        setAddSuccess();
        hideLoading();
      }
    } catch (error) {
      console.log('error addPhoto: ', error.response); //// for more
      hideLoading();
    }
  };

  const editPhoto = async (token, photoId, bodyData) => {
    showLoading();

    try {
      const res = await httpRequest.put(
        API + `/api/photo/${photoId}`,
        bodyData,
        {
          headers: {
            'x-auth-token': token,
          },
        }
      );

      // console.log('res editPhoto: ', res);
      // // condition
      if (res.data.isSucess) {
        openNotificationWithIcon(
          'success',
          'Photo have been added!',
          res.data.msg
        );
        setEditSuccess();
      }
      hideLoading();
    } catch (error) {
      console.log('error editPhoto: ', error.response); //// for more
      hideLoading();
    }
  };

  const deletePhoto = async (token, photoId) => {
    showLoading();

    try {
      const res = await httpRequest.delete(API + `/api/photo/${photoId}`, {
        headers: {
          'x-auth-token': token,
        },
      });

      // console.log('res deletePhoto: ', res);
      // // condition
      if (res.data.isSucess) {
        openNotificationWithIcon(
          'success',
          'Photo have been deleted!',
          res.data.msg
        );
        setEditSuccess();
      }
      hideLoading();
    } catch (error) {
      console.log('error deletePhoto: ', error.response);
      hideLoading();
    }
  };

  useEffect(() => {
    if (!token) {
      unsetLoginSuccess();
      return;
    }

    authenticate(token);
  }, [token]);

  // useEffect(() => {
  //   console.log('any curentPath: ', state.currentPagePath);
  //   if (!state.currentPagePath) {
  //     // setCurrentPagePath('');
  //     return;
  //   }

  //   setCurrentPagePath(state.currentPagePath);
  // }, [state.currentPagePath]);

  return (
    <PhotoContext.Provider
      value={{
        openNotificationWithIcon,
        isLoading: state.isLoading,
        showLoading,
        hideLoading,
        registerSuccess: state.registerSuccess,
        register,
        loginSuccess: state.loginSuccess,
        login,
        authenticate,
        isAuth: state.isAuth,
        unsetIsAuth,
        user: state.user,
        unsetUser,
        photos: state.photos,
        getAllPhotos,
        photo: state.photo,
        getPhoto,
        setPhoto,
        totalPhotos: state.totalPhotos,
        page: state.page,
        limitPhotos: state.limitPhotos,
        setPage,
        setLimitPhotos,
        unsetLoginSuccess,
        unsetRegisterSuccess,
        addSuccess: state.addSuccess,
        editSuccess: state.editSuccess,
        unsetAddSuccess,
        unsetEditSuccess,
        // currentPagePath: state.currentPagePath,
        // setCurrentPagePath,
        addPhoto,
        editPhoto,
        deletePhoto,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

const usePhotoContext = () => useContext(PhotoContext);

export { PhotoProvider, usePhotoContext };
