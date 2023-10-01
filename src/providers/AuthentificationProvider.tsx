import React, {FC, createContext, useContext, useEffect, useState} from 'react';
import {AuthentificationContextInterface, AuthentificationProviderProps} from './types';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const AuthentificationContext = createContext<AuthentificationContextInterface | null>(null);

const AuthentificationProvider: FC<AuthentificationProviderProps> = ({children}) => {
  /**
   * Current logged in user
   */
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  /**
   * Phone number authentification confirmation result
   */
  const [confirmation, setConfirmation] = useState<FirebaseAuthTypes.ConfirmationResult>();

  /**
   * Effect for setting the user when the authentification state has been changed
   */
  useEffect(() => {
    return auth().onAuthStateChanged(user => setUser(user));
  }, []);

  /**
   * Signs in with a phone number
   * @param phoneNumber phone number
   */
  const signInWithPhoneNumber = async (phoneNumber: string): Promise<void> => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setConfirmation(confirmation);
  };

  /**
   * Confirms the code sent by SMS using the {@link signInWithPhoneNumber} function
   * @param code Code received by an SMS
   * @returns true if the code is valid, false otherwise
   */
  const confirmCode = async (code: string): Promise<boolean> => {
    if (!confirmation) {
      throw new Error('Method called before "signInWithPhoneNumber"');
    }
    try {
      await confirmation.confirm(code);
    } catch {
      return false;
    }
    return true;
  };

  return (
    <AuthentificationContext.Provider value={{signInWithPhoneNumber, confirmCode}}>
      {children}
    </AuthentificationContext.Provider>
  );
};

/**
 * Hook that retrieves the authentification provider
 * @returns authentification provider
 */
export function useAuthentification(): AuthentificationContextInterface {
  const authentificationContext = useContext(AuthentificationContext);
  if (!authentificationContext) {
    throw new Error("'useAuthentification()' called outside of AuthentificationProvider?");
  }
  return authentificationContext;
}

export default AuthentificationProvider;
