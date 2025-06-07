import React, { FC } from 'react';
import { FaUser } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import styles from './Nav.module.scss';

const Nav: FC = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" />
      </div>
      <div className={styles.links}>
        <NavLink to="/request" className={({ isActive }) => (isActive ? styles.active : '')}>
          Запрос
        </NavLink>
        <NavLink to="/all_data" className={({ isActive }) => (isActive ? styles.active : '')}>
          Все данные
        </NavLink>
        <NavLink to="/statistics" className={({ isActive }) => (isActive ? styles.active : '')}>
          Статистика
        </NavLink>
        <NavLink to="/report" className={({ isActive }) => (isActive ? styles.active : '')}>
          Отчёт и рекомендации
        </NavLink>
      </div>
      <div className={styles.profile}>
        <NavLink to="/profile">
          <FaUser size={24} />
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
