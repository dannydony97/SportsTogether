import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import MobileNumberScreen from './MobileNumberScreen';
import {LoginNavigatorParamsList, LoginNavigatorProps} from './types';
import CountryCodesScreen from './CountryCodesScreen';
import NavigationBar from '../../components/NavigationBar';
import ConfirmNumberScreen from './ConfirmNumberScreen';
import CreateAccountWizardScreen from './CreateAccountWizardScreen';

const Stack = createNativeStackNavigator<LoginNavigatorParamsList>();

const LoginNavigator: FC<LoginNavigatorProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <NavigationBar {...props} />,
      }}
      initialRouteName="Login">
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
          headerShown: false,
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
