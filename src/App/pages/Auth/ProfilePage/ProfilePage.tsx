import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import { routerUrls } from 'config/routerUrls';
import { AppDispatch, RootState } from 'store';
import { logout } from '../../../../reducers/authReducer';
import styles from './ProfilePage.module.scss';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate(routerUrls.login.mask);
  };

  if (loading) return <Loader />;
  if (error) return <div>Ошибка: {error}</div>;
  if (!user) {
    navigate('/login');
  }

  return (
    <div className={styles.profile}>
      <section className={styles.profile__nav}>
        <section className={styles.profile__info__contacts}>
          <p className={styles.profile__info__contacts__subtitle}>E-mail: {user?.email}</p>
        </section>
        <span className={styles.profile__nav__item}>
          <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_148_731)">
              <path
                d="M7.18018 2.0005H2.18018V9.0005C2.18018 9.26572 2.28553 9.52007 2.47307 9.70761C2.66061 9.89515 2.91496 10.0005 3.18018 10.0005H7.18018M7.68018 7.5005L9.18018 6.0005M9.18018 6.0005L7.68018 4.5005M9.18018 6.0005H4.18018"
                stroke="#E18080"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_148_731">
                <rect width="12.12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <a onClick={handleLogout} className={styles.profile__nav__item__logout}>
            Выйти
          </a>
        </span>
      </section>
    </div>
  );
};

export default ProfilePage;
