import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from 'components/Loader';
import { Button } from 'components/ui/Button';
import { routerUrls } from 'config/routerUrls';
import { AppDispatch, RootState } from 'store';
import { getCurrentUser } from '../../../../actions/authActions';
import { getProfile, updateProfile } from '../../../../actions/profileActions';
import styles from './EditProfilePage.module.scss';

const EditProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector((state: RootState) => state.profile);
  const { user } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    username: '',
    avatar: '',
  });

  useEffect(() => {
    if (user) {
      if (!profile) {
        dispatch(getProfile({ username: user.username, with_token: true }));
      } else {
        setFormData({
          username: profile.username,
          avatar: profile.avatar || 'https://imgur.com/a/wbzbkuS',
        });
      }
    }
  }, [profile, user, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    const updatePayload: Partial<typeof formData> = {};

    (Object.keys(formData) as (keyof typeof formData)[]).forEach((key) => {
      if (key === 'username') {
        if (formData.username !== profile.username) {
          updatePayload.username = formData.username;
        }
      } else if (formData[key] !== profile[key]) {
        updatePayload[key] = formData[key];
      }
    });

    const resultAction = await dispatch(updateProfile({ originalUsername: profile.username, data: updatePayload }));

    if (updateProfile.fulfilled.match(resultAction)) {
      // Если никнейм изменился, обновляем auth state
      if (updatePayload.username) {
        dispatch(getCurrentUser());
      }
    }

    navigate(routerUrls.profile.mask);
  };

  return (
    <div>
      <h1 className={styles.bold28}>Редактирование профиля</h1>
      {loading && <Loader />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="username">Никнейм</label>
        <input
          className={styles.form__input}
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Никнейм"
        />
        <label htmlFor="avatar">Аватарка</label>
        <input
          className={styles.form__input}
          type="text"
          name="avatar"
          value={formData.avatar}
          onChange={handleChange}
          placeholder="Ссылка на аватар"
        />
        <Button type="submit" disabled={loading}>
          Сохранить
        </Button>
      </form>
    </div>
  );
};

export default EditProfilePage;
