import React from 'react';
import '../../index.scss';
import ChatBot from '../ChatBot/ChatBot';
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
      <ChatBot />
    </div>
  );
};

export default RootLayout;
