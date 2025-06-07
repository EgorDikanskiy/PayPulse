import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import { Button } from 'components/ui/Button';
import { GoogleIcon } from 'components/ui/icons/GoogleIcon';
import { LockIcon } from 'components/ui/icons/LockIcon';
import { VkIcon } from 'components/ui/icons/VkIcon';
import { YaIcon } from 'components/ui/icons/YaIcon';
import { routerUrls } from 'config/routerUrls';
import { AppDispatch, RootState } from 'store';
import { getCurrentUser, login, resetError } from '../../../../actions/authActions';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, user } = useSelector((state: RootState) => state.auth);
  const accessToken = localStorage.getItem('access_token');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (user) {
      navigate(routerUrls.profile.mask);
    }
  }, [user, navigate]);

  useEffect(() => {
    if (error === 'Токен отсутствует') {
      dispatch(resetError());
    }
  }, [error, dispatch]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const result = await dispatch(login({ password, login: email }));

    if (login.fulfilled.match(result)) {
      navigate(routerUrls.profile.mask);
    } else if (login.rejected.match(result)) {
      console.log('Login failed:', result.payload);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.login}>
      <h1 className={styles.bold28}>{'Вход'}</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="email" className={styles.regular16}>
          E-mail или никнейм
        </label>
        <input
          className={styles.form__input}
          type="text"
          id="email"
          placeholder="Ваш E-mail или никнейм"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password" className={styles.regular16}>
          Пароль
        </label>
        <input
          className={styles.form__input}
          type="password"
          id="password"
          placeholder="Минимум 8 символов"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button className={styles.form__button} type="submit" disabled={loading}>
          Войти
        </Button>
        {error && (
          <div style={{ color: 'red' }}>
            {typeof error === 'string' ? (
              <p>{error}</p>
            ) : Array.isArray(error) ? (
              (error as string[]).map((msg: string, index: number) => <p key={index}>{msg}</p>)
            ) : null}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
