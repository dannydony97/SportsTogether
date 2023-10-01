import React, {FC} from 'react';
import {LoginNavigatorScreenProps} from './types';
import {Button, Text} from 'react-native-paper';
import Screen from '../../components/Screen';

const LoginScreen: FC<LoginNavigatorScreenProps<'Login'>> = ({navigation}) => {
  /**
   * Triggered when the 'use mobile number' button has been pressed
   */
  const onMobileNumberPress = (): void => {
    navigation.navigate('MobileNumber', {
      countryCallingCode: '+40',
    });
  };

  return (
    <Screen safeArea>
      <Text variant="headlineMedium">Sports Together</Text>
      <Button>Continue with Apple</Button>
      <Button>Continue with Facebook</Button>
      <Button onPress={onMobileNumberPress}>Use mobile number</Button>
    </Screen>
  );
};

export default LoginScreen;
