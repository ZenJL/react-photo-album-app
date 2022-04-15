import { useEffect, useRef } from 'react';
import {
  Navigate,
  // Outlet,
  useLocation,
} from 'react-router-dom';
import { usePhotoContext } from 'context/photoContext';

function AuthGuard({ children }) {
  const { isAuth, setPage, setLimitPhotos } = usePhotoContext();

  const isMounted = useRef(true);

  const token = sessionStorage.getItem('token');

  const useQueryString = () => {
    return new URLSearchParams(useLocation().search);
  };

  const queryString = useQueryString();

  useEffect(() => {
    if (isMounted) {
      const queryPage = queryString.get('page');
      const queryLimit = queryString.get('limit');
      // console.log('queryPage auth: ', queryPage);
      // console.log('queryPage auth: ', typeof queryPage);
      // console.log('queryLimit auth: ', queryLimit);
      // console.log('queryLimit auth: ', typeof queryLimit);

      if (queryPage !== null) setPage(queryPage);

      if (queryLimit !== null) setLimitPhotos(queryLimit);
      //// Work

      // if (!queryPage) setPage(queryPage);  //// not work...
    }

    return () => {
      isMounted.current = false;
    };
    //// eslint-disable-next-line
  }, [isMounted]);

  if (!token || !isAuth) {
    return <Navigate to='/login' />;
  }

  // return <Outlet
  return <>{children}</>;
}

export default AuthGuard;
