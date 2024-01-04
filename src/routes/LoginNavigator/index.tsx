import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import MobileNumberScreen from './MobileNumberScreen';
import {LoginNavigatorParamsList} from './types';
import CountryCodesScreen from './CountryCodesScreen';
import ConfirmNumberScreen from './ConfirmNumberScreen';
import {MainNavigatorScreenProps} from '../MainNavigator/types';
import CreateAccountWizardScreen from './CreateAccountWizardScreen';

const Stack = createNativeStackNavigator<LoginNavigatorParamsList>();

const LoginNavigator: FC<MainNavigatorScreenProps<'LoginNavigator'>> = ({}) => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MobileNumber"
        component={MobileNumberScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name="CountryCodes"
        component={CountryCodesScreen}
        options={{
          title: 'Country / Region',
          presentation: 'containedModal',
        }}
      />
      <Stack.Screen
        initialParams={{phoneNumber: ''}}
        name="ConfirmNumber"
        component={ConfirmNumberScreen}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen name="CreateAccountWizard" component={CreateAccountWizardScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
