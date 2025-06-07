import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Nav.module.scss';

const Nav: FC = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to="/request" className={({ isActive }) => (isActive ? styles.active : '')}>
        Запрос
      </NavLink>
      <NavLink to="/all-data" className={({ isActive }) => (isActive ? styles.active : '')}>
        Все данные
      </NavLink>
      <NavLink to="/statistics" className={({ isActive }) => (isActive ? styles.active : '')}>
        Статистика
      </NavLink>
      <NavLink to="/report" className={({ isActive }) => (isActive ? styles.active : '')}>
        Отчёт и рекомендации
      </NavLink>
    </nav>
  );
};

export default Nav;
