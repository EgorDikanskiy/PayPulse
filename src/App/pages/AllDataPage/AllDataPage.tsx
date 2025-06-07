import React from 'react';
import Nav from 'components/Nav';
import Table from './components/Table';
import styles from './AllDataPage.module.scss';

const AllDataPage = () => {
  return (
    <div className={styles.requestPage}>
      <Table />
    </div>
  );
};

export default AllDataPage;
