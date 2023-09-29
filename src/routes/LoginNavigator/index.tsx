import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './LoginScreen';
import MobileNumberScreen from './MobileNumberScreen';
import {LoginNavigatorParamsList, LoginNavigatorProps} from './types';
import CountryCodes from './CountryCodes';
import NavigationBar from '../../components/NavigationBar';

const Stack = createNativeStackNavigator<LoginNavigatorParamsList>();

const LoginNavigator: FC<LoginNavigatorProps> = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={{
        header: props => <NavigationBar {...props} />,
      }}>
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
        component={CountryCodes}
        options={{
          headerShown: false,
          presentation: 'containedModal',
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
