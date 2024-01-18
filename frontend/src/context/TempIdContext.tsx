import React, { createContext, useState, useContext, ReactNode } from 'react';


interface UserProviderProps {
    children: ReactNode;
}


interface TempIdContextType {
    tempId: string | null;
    setTempId: (id: string | null) => void;
}


interface UserData {
    userId: number;
    tempId: string;
    name: string;
    email: string;
    password: string;
}


const TempIdContext = createContext<TempIdContextType>({
    tempId: null,
    setTempId: (id: string | null) => {}
});


export const useTempId = () => useContext(TempIdContext);

export const TempIdProvider = ({ children }: UserProviderProps) => {
    const [tempId, setTempId] = useState<string | null>(null);

    return (
        <TempIdContext.Provider value={{ tempId, setTempId }}>
            {children}
        </TempIdContext.Provider>
    );
};
