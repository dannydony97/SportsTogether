import React, {FC} from 'react';
import {LoginNavigatorScreenProps} from './types';
import {Button, Text, useTheme} from 'react-native-paper';
import Screen from '../../components/Screen';
import {AppleButton} from '@invertase/react-native-apple-authentication';
import {Platform, View} from 'react-native';
import {useAuthentification} from '../../providers/AuthentificationProvider';

const LoginScreen: FC<LoginNavigatorScreenProps<'Login'>> = ({navigation}) => {
  /**
   * Methods that signs the user with a phone number
   */
  const {signInWithApple} = useAuthentification();

  /**
   * Dark or white theme
   */
  const {dark} = useTheme();

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
    <Screen safeArea>
      <Text variant="headlineMedium">Sports Together</Text>
      <View style={{flex: 1, padding: 30}}>
        {Platform.OS === 'ios' && (
          <AppleButton
            buttonStyle={dark ? AppleButton.Style.WHITE : AppleButton.Style.BLACK}
            buttonType={AppleButton.Type.SIGN_IN}
            onPress={onApplePress}
            style={{width: '100%', height: 30}}
          />
        )}
        <Button>Continue with Facebook</Button>
        <Button onPress={onMobileNumberPress}>Use mobile number</Button>
      </View>
    </Screen>
  );
};

export default LoginScreen;
