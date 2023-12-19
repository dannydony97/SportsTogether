import {PropsWithChildren} from 'react';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import { UserProps } from '../api/datamodel/types';

/**
 * Authentification context interface
 */
export interface AuthentificationContextInterface {
  /**
   * UID of the logged in user
   */
  user: FirebaseAuthTypes.User | null;
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
   * User properties
   */
  userProps: UserProps | undefined;
  /**
   * Refreshes the user properties
   */
  refresh: () => Promise<void>;
}

/**
 * User Provider properties
 */
export interface UserProviderProps extends PropsWithChildren {}
