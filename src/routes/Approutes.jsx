import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from '../page/MainPage';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import PrivatRoute from './PrivatRoute';
import { useSelector } from 'react-redux';

const Approutes = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <PrivatRoute
          component={<MainPage />}
          fallbackPath={'/signIn'}
          isAuth={isAuth}
        />
      ),
    },
    {
      path: '/signIn',
      element: (
        <PrivatRoute
          component={<SignIn />}
          fallbackPath={'/'}
          isAuth={!isAuth}
        />
      ),
    },
    {
      path: '/signUp',
      element: (
        <PrivatRoute
          component={<SignUp />}
          fallbackPath={'/'}
          isAuth={!isAuth}
        />
      ),
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Approutes;
