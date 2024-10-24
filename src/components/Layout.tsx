import React from 'react';
import CyberScene from './CyberScene';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <div className="w-1/3 overflow-y-auto p-4">
        {children}
      </div>
      <div className="w-2/3 fixed right-0 top-0 bottom-0">
        <CyberScene />
      </div>
    </div>
  );
};

export default Layout;
