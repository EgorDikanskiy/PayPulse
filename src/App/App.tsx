import React from 'react';
import { Routes, Route, BrowserRouter, Navigate, useLocation, matchPath } from 'react-router-dom';
import PrivateRoute from 'components/PrivateRoute';
import RootLayout from 'components/RootLayout';
import { routerUrls } from 'config/routerUrls';

import EditProfilePage from './pages/Auth/EditProfilePage';
import Login from './pages/Auth/LoginPage';
import MailConfirmation from './pages/Auth/MailConfirmation';
import ProfilePage from './pages/Auth/ProfilePage';
import ResetPasswordPage from './pages/Auth/ResetPasswordPage';
import RequestPage from './pages/RequestPage';

function AppContent() {
  const location = useLocation();
  const isViewComicsPage = matchPath(routerUrls.viewComics.mask, location.pathname);

  return (
    <RootLayout>
      <Routes>
        <Route path="/" element={<Navigate to={routerUrls.home.mask} replace />} />
        <Route path={routerUrls.login.mask} element={<Login />} />
        <Route path={routerUrls.confirm_mail.mask} element={<MailConfirmation />} />

        <Route element={<PrivateRoute />}>
          <Route path={routerUrls.profile.mask} element={<ProfilePage />} />
          <Route path={routerUrls.edit_profile.mask} element={<EditProfilePage />} />
          <Route path={routerUrls.reset_password.mask} element={<ResetPasswordPage />} />
        </Route>

        <Route path={routerUrls.request.mask} element={<RequestPage />} />

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
