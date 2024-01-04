import React, {FC, useEffect} from 'react';
import {LoginNavigatorScreenProps} from './types';
import Screen from '../../components/Screen';
import {AppleButton} from '@invertase/react-native-apple-authentication';
import {Platform} from 'react-native';
import {useAuthentification} from '../../providers/AuthentificationProvider';
import {Button, Text, View} from 'react-native-ui-lib';
import {useUser} from '../../providers/UserProvider';

const LoginScreen: FC<LoginNavigatorScreenProps<'Login'>> = ({navigation}) => {
  /**
   * Authentificated user
   */
  const {user} = useAuthentification();

  /**
   * User's properties
   */
  const {userProps} = useUser();

  useEffect(() => {
    if (user !== null && userProps === null) {
      navigation.navigate('CreateAccountWizard', {});
    }
  }, [user, userProps, navigation]);

  /**
   * Methods that signs the user with a phone number
   */
  const {signInWithApple} = useAuthentification();

  /**
   * Triggered when the 'use mobile number' button has been pressed
   */
  const onMobileNumberPress = (): void => {
    navigation.navigate('MobileNumber', {
      countryCallingCode: '+40',
    });
  };

  /**
   * Triggered when the 'Continue with Apple' button has been pressed
   */
  const onApplePress = async (): Promise<void> => {
    try {
      await signInWithApple();
    } catch {}
  };

  return (
    <Screen>
      <Text text30>Sports Together</Text>
      <View flex bottom>
        {Platform.OS === 'ios' && (
          <AppleButton
            buttonStyle={AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.SIGN_IN}
            onPress={onApplePress}
            style={{width: '100%', height: 30}}
          />
        )}
        <Button label="Continue with Facebook" />
        <Button label="Use mobile number" onPress={onMobileNumberPress} />
      </View>
    </Screen>
  );
};

export default LoginScreen;
