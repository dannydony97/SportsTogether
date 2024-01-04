import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginNavigator from '../LoginNavigator';
import HomeDrawer from '../HomeDrawer';
import {MainNavigatorParamsList, MainNavigatorProps} from './types';
import LoadingScreen from './LoadingScreen';

const Stack = createNativeStackNavigator<MainNavigatorParamsList>();

const MainNavigator: FC<MainNavigatorProps> = ({}) => {
  return (
    <Stack.Navigator
      initialRouteName="Loading"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Loading" component={LoadingScreen} />
      <Stack.Screen name="LoginNavigator" component={LoginNavigator} />
      <Stack.Screen name="HomeNavigator" component={HomeDrawer} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
