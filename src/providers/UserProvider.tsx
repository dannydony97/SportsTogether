import React, {FC, createContext, useCallback, useContext, useEffect, useRef, useState} from 'react';
import {UserContextInterface, UserProviderProps} from './types';
import {useAuthentification} from './AuthentificationProvider';
import {UserProps} from '../api/datamodel/types';
import {UsersCollection} from '../api/datamodel/UsersCollection';
import storage from '@react-native-firebase/storage';

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
        photoURL: user.photoURL,
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
  const createUser = async ({displayName, photoURL, ...userDocumentData}: UserProps): Promise<void> => {
    if (!user) {
      throw new Error('Could not fetch props. No user is authenticated');
    }

    user.displayName = displayName;
    await usersCollection.current.addData(userDocumentData, user.uid);
    setUserProps({
      displayName,
      photoURL,
      ...userDocumentData,
    });
  };

  /**
   * Uploads a new profile picture for the authentificated user
   * @param profilePicturePath path to the local profile picture
   * @returns The download URL of the uploaded profile picture
   */
  const uploadProfilePicture = async (profilePicturePath: string): Promise<string> => {
    if (!user) {
      throw new Error('Could not upload profile picture. No user is authentificated');
    }
    return await uploadFile(profilePicturePath, `${user?.uid}/profile-picture.jpg`);
  };

  /**
   * Uploads a file located at {@link locationPath} into the firebase storage at {@link destinationPath}
   * @param locationPath existent local file
   * @param destinationPath destination where the file will be uploaded into the firebase storage
   * @returns the download URL of th uploaded file
   */
  const uploadFile = async (locationPath: string, destinationPath: string): Promise<string> => {
    const reference = storage().ref(destinationPath);
    await reference.putFile(locationPath);
    return reference.getDownloadURL();
  };

  useEffect(() => {
    refreshUser();
  }, [refreshUser, user]);

  return (
    <UserContext.Provider value={{userProps, refreshUser, createUser, uploadProfilePicture}}>
      {children}
    </UserContext.Provider>
  );
};

export function useUser(): UserContextInterface {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("'useUser()' called outside of UserProvider?");
  }
  return userContext;
}

export default UserProvider;
