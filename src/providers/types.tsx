import {PropsWithChildren} from 'react';

/**
 * Authentification context interface
 */
export interface AuthentificationContextInterface {
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
export interface UserContextInterface {}

/**
 * User Provider properties
 */
export interface UserProviderProps extends PropsWithChildren {
  /**
   * UID of an user
   */
  uid: string;
}
