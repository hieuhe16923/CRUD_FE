// AppRouter.tsx
import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom'; // 👈 Đảm bảo dòng này có!
import MainLayout from '../layouts/MainLayout';
import Main from '../components/Main/Main';
import PetCartPage from '../components/PetCartPage/PetCartPage';
import CheckoutPage from '../components/CheckoutPage/CheckoutPage';
import OrderDetailPage from '../components/OrderDetailPage/OrderDetailPage';

const RouterView = () => {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <Main />
        </MainLayout>
      ),
    },
    {
      path: '/cart',
      element: (
        <MainLayout>
          <PetCartPage />
        </MainLayout>
      ),
    },
    {
      path: '/checkout',
      element: (
        <MainLayout>
          <CheckoutPage/>
        </MainLayout>
      ),
    },{
      path: '/orderdetail',
      element: (
        <MainLayout>
          <OrderDetailPage/>
        </MainLayout>
      ),
    }
  ]);

  return routes;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <RouterView />
    </BrowserRouter>
  );
};

export default AppRouter;
