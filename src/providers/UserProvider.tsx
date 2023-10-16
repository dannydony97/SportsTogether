import React, {FC, createContext, useContext, useRef} from 'react';
import {UserContextInterface, UserProviderProps} from './types';
import {UserDocument} from '../api/datamodel/User';

const UserContext = createContext<UserContextInterface | null>(null);

const UserProvider: FC<UserProviderProps> = ({uid, children}) => {
  /**
   * User document instance
   */
  const userDocument = useRef(new UserDocument(uid));

  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export function useUser(): UserContextInterface {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("'useUser()' called outside of UserProvider?");
  }
  return userContext;
}

export default UserProvider;
