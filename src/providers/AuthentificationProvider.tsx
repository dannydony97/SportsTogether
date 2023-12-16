import React, {FC, createContext, useContext, useEffect, useState} from 'react';
import {AuthentificationContextInterface, AuthentificationProviderProps} from './types';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import appleAuth from '@invertase/react-native-apple-authentication';
import {Platform} from 'react-native';

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
   * Signs In with Apple account on an Apple device
   */
  const signInWithAppleOnAppleDevice = async (): Promise<void> => {
    if (Platform.OS !== 'ios') {
      throw new Error('Call this method only on an iOS device');
    }

    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign In failed. No identity token returned');
    }

    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
    await auth().signInWithCredential(appleCredential);
  };

  /**
   * Signs In with Apple account on an Android device
   */
  const signInWithAppleOnAndroidDevice = async (): Promise<void> => {
    if (Platform.OS !== 'android') {
      throw new Error('Call this method only on an Android device');
    }

    throw new Error('TO DO! Not implemented');
  };

  /**
   * Signs In with Apple account
   */
  const signInWithApple = async (): Promise<void> => {
    switch (Platform.OS) {
      case 'ios':
        await signInWithAppleOnAppleDevice();
        break;
      case 'android':
        await signInWithAppleOnAndroidDevice();
        break;
    }
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
    <AuthentificationContext.Provider value={{user, signInWithPhoneNumber, signInWithApple, confirmCode}}>
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
