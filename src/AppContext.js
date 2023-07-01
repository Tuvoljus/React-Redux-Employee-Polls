import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [invalidUrl, setInvalidUrl] = useState(false);

  return (
    <AppContext.Provider value={{ invalidUrl, setInvalidUrl }}>
      {children}
    </AppContext.Provider>
  );
};
