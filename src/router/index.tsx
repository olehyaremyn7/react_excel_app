import React, { FC } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { JSX } from '../interfaces';
import Dashboard from '../pages/Dashboard';
import Excel from '../pages/Excel';
import { Routes } from './interface';
import { createExcelLink } from './utils';

const Router: FC = (): JSX =>
  useRoutes([
    {
      path: createExcelLink(':id'),
      element: <Excel />,
    },
    {
      path: Routes.DASHBOARD,
      element: <Dashboard />,
    },
    {
      path: '*',
      element: <Navigate to={Routes.DASHBOARD} replace />,
    },
  ]);

export default Router;
