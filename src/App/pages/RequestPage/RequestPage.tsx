import React from 'react';
import Nav from 'components/Nav';
import { RequestForm } from './components/RequestForm';
import styles from './RequestPage.module.scss';

const RequestPage = () => {
  return (
    <div className={styles.requestPage}>
      <Nav />
      <RequestForm />
    </div>
  );
};

export default RequestPage;
