import {PropsWithChildren} from 'react';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {PlaceData, UserProps, WithID} from '../api/datamodel/types';

/**
 * Authentification context interface
 */
export interface AuthentificationContextInterface {
  /**
   * Authentificated user
   */
  user: FirebaseAuthTypes.User | null | undefined;
  /**
   * Signs in with a phone number
   * @param phoneNumber phone number
   */
  signInWithPhoneNumber: (phoneNumber: string) => Promise<void>;
  /**
   * Signs in with Apple account
   */
  signInWithApple: () => Promise<void>;
  /**
   * Confirms the code sent by SMS using the {@link signInWithPhoneNumber} function
   * @param code Code received by an SMS
   * @returns true if the code is valid, false otherwise
   */
  confirmCode: (code: string) => Promise<boolean>;
}

/**
 * Authentification Provider properties
 */
export interface AuthentificationProviderProps extends PropsWithChildren {}

/**
 * User context interface
 */
export interface UserContextInterface {
  /**
   * User's properties
   */
  userProps: UserProps | null | undefined;
  /**
   * Refreshes the user properties
   */
  refreshUser: () => Promise<void>;
  /**
   * User's properties
   * @param userProps user's properties
   */
  createUser: (userProps: UserProps) => Promise<void>;
  /**
   * Uploads a new profile picture for the authentificated user
   * @param profilePicturePath path to the local profile picture
   * @returns The download URL of the uploaded profile picture
   */
  uploadProfilePicture: (profilePicturePath: string) => Promise<string>;
}

/**
 * User Provider properties
 */
export interface UserProviderProps extends PropsWithChildren {}

/**
 * Places context interface
 */
export interface PlacesContextInterface {
  /**
   * Places document data
   */
  places: WithID<PlaceData>[];
  /**
   * Refreshes the places array
   */
  refreshPlaces: () => Promise<void>;
}

/**
 * Places Provider properties
 */
export interface PlacesProviderProps extends PropsWithChildren {}
