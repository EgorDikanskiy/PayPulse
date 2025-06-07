import React from 'react';
import '../../index.scss';
import Nav from '../Nav';

type RootLayoutProps = {
  children?: React.ReactNode;
};

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <div>
      <Nav />
      <div className="container">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default RootLayout;
