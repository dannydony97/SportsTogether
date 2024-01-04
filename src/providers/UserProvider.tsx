import React, {FC, createContext, useCallback, useContext, useEffect, useRef, useState} from 'react';
import {UserContextInterface, UserProviderProps} from './types';
import {useAuthentification} from './AuthentificationProvider';
import {UserProps} from '../api/datamodel/types';
import {UsersCollection} from '../api/datamodel/UsersCollection';

const UserContext = createContext<UserContextInterface | null>(null);

const UserProvider: FC<UserProviderProps> = ({children}) => {
  /**
   * Users collection object instance
   */
  const usersCollection = useRef(new UsersCollection());

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
  const fetchUserProps = useCallback(async (): Promise<UserProps | null | undefined> => {
    if (!user) {
      return undefined;
    }

    try {
      const userData = await usersCollection.current.getDataById(user.uid);
      return {
        ...userData,
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
  const createUser = async ({displayName, ...userDocumentData}: UserProps): Promise<void> => {
    if (!user) {
      throw new Error('Could not fetch props. No user is authenticated');
    }

    user.displayName = displayName;
    await usersCollection.current.addData(userDocumentData, user.uid);
    setUserProps({
      displayName,
      ...userDocumentData,
    });
  };

  useEffect(() => {
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
