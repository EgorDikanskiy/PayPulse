import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import { AppDispatch, RootState } from 'store';
import { getCurrentUser } from '../../actions/authActions';

const PrivateRoute: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading } = useSelector((state: RootState) => state.auth);
  const accessToken = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchUserData = async () => {
      if (!accessToken) return;

      try {
        const result = await dispatch(getCurrentUser());
        if (result.meta.requestStatus === 'rejected') {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [accessToken, dispatch, navigate]);

  if (loading) {
    return <Loader />;
  }

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  if (!user) {
    return <Loader />;
  }

  return <Outlet />;
};

export default PrivateRoute;
