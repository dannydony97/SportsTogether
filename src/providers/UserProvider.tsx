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
  const [userProps, setUserProps] = useState<UserProps | null>();

  /**
   * Fetches all user's properties
   * @returns User properties
   */
  const fetchUserProps = useCallback(async (): Promise<UserProps | null> => {
    if (!user) {
      throw new Error('Could not fetch props. No user is authenticated');
    }

    try {
      const userDocument = await UserDocument.get(user.uid);
      return {
        ...userDocument.data,
        displayName: user.displayName,
      };
    } catch {
      return null;
    }
  }, [user]);

  /**
   * Refreshes the user's properties
   */
  const refreshUser = useCallback(async () => {
    const userProps = await fetchUserProps();
    setUserProps(userProps);
  }, [fetchUserProps]);

  /**
   * Creates the authentificated user
   * @param param0 user properties
   */
  const createUser = async ({displayName, ...userProps}: UserProps): Promise<void> => {
    if (!user) {
      throw new Error('Could not fetch props. No user is authenticated');
    }

    user.displayName = displayName;
    await UserDocument.create(user.uid, userProps);
    setUserProps({
      displayName,
      ...userProps,
    });
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    refreshUser();
  }, [refreshUser, user]);

  return <UserContext.Provider value={{userProps, refreshUser, createUser}}>{children}</UserContext.Provider>;
};

export function useUser(): UserContextInterface {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("'useUser()' called outside of UserProvider?");
  }
  return userContext;
}

export default UserProvider;
