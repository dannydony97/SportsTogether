import React, {FC, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginNavigator from '../LoginNavigator';
import HomeNavigator from '../HomeNavigator';
import {MainNavigatorParamsList, MainNavigatorProps} from './types';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAuthentification} from '../../providers/AuthentificationProvider';

const Stack = createNativeStackNavigator<MainNavigatorParamsList>();

const MainNavigator: FC<MainNavigatorProps> = ({}) => {
  /**
   * Authentificated user UID
   */
  const {user} = useAuthentification();

  /**
   * Navigation object instance
   */
  const navigation = useNavigation<NavigationProp<MainNavigatorParamsList>>();

  useEffect(() => {
    if (user) {
      navigation.navigate('HomeNavigator', {});
    }
  }, [navigation, user]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoginNavigator" component={LoginNavigator} />
      <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
