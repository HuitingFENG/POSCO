/* // PartagerContext.js
import React from 'react';

const PartagerContext = React.createContext({
  fromPartager: false,
  setFromPartager: () => {}
});

export default PartagerContext;
 */


// PartagerContext.js
import React, { useState, createContext, useContext, ReactNode } from 'react';

interface UserProviderProps {
    children: ReactNode;
}


interface PartagerContextType {
    fromPartager: boolean;
    setFromPartager: (value: boolean) => void;
}


export const PartagerContext = createContext<PartagerContextType>({
    fromPartager: false,
    setFromPartager: () => {},
});


export const PartagerProvider = ({ children }: UserProviderProps) => {
  const [fromPartager, setFromPartager] = useState(false);

  return (
    <PartagerContext.Provider value={{ fromPartager, setFromPartager }}>
      {children}
    </PartagerContext.Provider>
  );
};
