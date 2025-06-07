import React from 'react';
import { Routes, Route, BrowserRouter, Navigate, useLocation, matchPath } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import RootLayout from 'components/RootLayout';
import { routerUrls } from 'config/routerUrls';

import AllDataPage from './AllDataPage';
import Login from './pages/Auth/LoginPage';
import ProfilePage from './pages/Auth/ProfilePage';
import Report from './pages/Report/Report';
import RequestPage from './pages/RequestPage';
import StatisticsPage from './pages/Statistics/StatisticsPage';

function AppContent() {
  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Navigate to={routerUrls.login.mask} replace />} />
        <Route path={routerUrls.login.mask} element={<Login />} />

        <Route element={<PrivateRoute />}>
          <Route path={routerUrls.profile.mask} element={<ProfilePage />} />
        </Route>

        <Route path={routerUrls.request.mask} element={<RequestPage />} />
        <Route path={routerUrls.all_data.mask} element={<AllDataPage />} />
        <Route path={routerUrls.statistics.mask} element={<StatisticsPage />} />
        <Route path={routerUrls.report.mask} element={<Report />} />

        <Route path="*" element={<Navigate to={routerUrls.home.mask} replace />} />
      </Routes>
    </RootLayout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
export default App;
