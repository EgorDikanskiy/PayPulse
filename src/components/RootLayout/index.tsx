import React from 'react';
import { Outlet } from 'react-router-dom';
import ChatBot from '../ChatBot/ChatBot';

const RootLayout: React.FC = () => {
  return (
    <>
      <Outlet />
      <ChatBot />
    </>
  );
};

export default RootLayout;
