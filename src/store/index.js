import { createContext, useReducer } from 'react';
import { initialUserState, UserReducer } from './reducer';

export const UserContext = createContext(initialUserState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialUserState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
