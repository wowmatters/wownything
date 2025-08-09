import React, { Suspense } from 'react';
import { Route } from 'react-router';

import Loadable from 'react-loadable';
import { importRemote } from '@module-federation/utilities';

import LoginRedirect from 'app/modules/login/login-redirect';
import Logout from 'app/modules/login/logout';
import Home from 'app/modules/home/home';
import EntitiesRoutes from 'app/entities/routes';
import PrivateRoute from 'app/shared/auth/private-route';
import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';
import PageNotFound from 'app/shared/error/page-not-found';
import { AUTHORITIES } from 'app/config/constants';

const loading = <div>loading ...</div>;

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => loading,
});

const WowpassportRoutes = React.lazy(() =>
  importRemote<any>({
    url: `./services/wowpassport`,
    scope: 'wowpassport',
    module: './entities-routes',
  }).catch(() => import('app/shared/error/error-loading')),
);

const WowmigasRoutes = React.lazy(() =>
  importRemote<any>({
    url: `./services/wowmigas`,
    scope: 'wowmigas',
    module: './entities-routes',
  }).catch(() => import('app/shared/error/error-loading')),
);

const WowshiplogisticRoutes = React.lazy(() =>
  importRemote<any>({
    url: `./services/wowshiplogistic`,
    scope: 'wowshiplogistic',
    module: './entities-routes',
  }).catch(() => import('app/shared/error/error-loading')),
);

const WowcasemgmtRoutes = React.lazy(() =>
  importRemote<any>({
    url: `./services/wowcasemgmt`,
    scope: 'wowcasemgmt',
    module: './entities-routes',
  }).catch(() => import('app/shared/error/error-loading')),
);

const WowosintRoutes = React.lazy(() =>
  importRemote<any>({
    url: `./services/wowosint`,
    scope: 'wowosint',
    module: './entities-routes',
  }).catch(() => import('app/shared/error/error-loading')),
);

const AppRoutes = () => {
  return (
    <div className="view-routes">
      <ErrorBoundaryRoutes>
        <Route index element={<Home />} />
        <Route path="logout" element={<Logout />} />
        <Route
          path="admin/*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.ADMIN]}>
              <Admin />
            </PrivateRoute>
          }
        />
        <Route path="sign-in" element={<LoginRedirect />} />
        <Route
          path="wowpassport/*"
          element={
            <Suspense fallback={loading}>
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
                <WowpassportRoutes />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="wowmigas/*"
          element={
            <Suspense fallback={loading}>
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
                <WowmigasRoutes />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="wowshiplogistic/*"
          element={
            <Suspense fallback={loading}>
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
                <WowshiplogisticRoutes />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="wowcasemgmt/*"
          element={
            <Suspense fallback={loading}>
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
                <WowcasemgmtRoutes />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="wowosint/*"
          element={
            <Suspense fallback={loading}>
              <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
                <WowosintRoutes />
              </PrivateRoute>
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute hasAnyAuthorities={[AUTHORITIES.USER]}>
              <EntitiesRoutes />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </ErrorBoundaryRoutes>
    </div>
  );
};

export default AppRoutes;
