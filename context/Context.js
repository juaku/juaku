import React, { createContext, useContext, useRef } from 'react';

const Context = createContext();

export const Provider = ({ children }) => {
  const fileInputRef = useRef(null);

  const triggerUpload = () => {
	if (fileInputRef.current) {
	  fileInputRef.current.click();
	}
  };

  return (
	<Context.Provider value={{ fileInputRef, triggerUpload }}>
	  {children}
	</Context.Provider>
  );
};

export const useUpload = () => useContext(Context);