import React, {FC, createContext, useCallback, useContext, useEffect, useState} from 'react';
import {UserContextInterface, UserProviderProps} from './types';
import {UserDocument} from '../api/datamodel/User';
import {useAuthentification} from './AuthentificationProvider';
import {UserProps} from '../api/datamodel/types';

const UserContext = createContext<UserContextInterface | null>(null);

const UserProvider: FC<UserProviderProps> = ({children}) => {
  /**
   * UID of the authentificated user
   */
  const {user} = useAuthentification();

  /**
   * User's properties
   */
  const [userProps, setUserProps] = useState<UserProps | undefined>();

  /**
   * Fetches all user's properties
   * @returns User properties
   */
  const fetchUserProps = useCallback(async (): Promise<UserProps | undefined> => {
    if (!user) {
      return;
    }
    const userDocument = await UserDocument.get(user.uid);
    return {
      ...userDocument.data,
      displayName: user.displayName,
    };
  }, [user]);

  /**
   * Refreshes the user's properties
   */
  const refresh = useCallback(async () => {
    const userProps = await fetchUserProps();
    setUserProps(userProps);
  }, [fetchUserProps]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return <UserContext.Provider value={{userProps, refresh}}>{children}</UserContext.Provider>;
};

export function useUser(): UserContextInterface {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("'useUser()' called outside of UserProvider?");
  }
  return userContext;
}

export default UserProvider;
