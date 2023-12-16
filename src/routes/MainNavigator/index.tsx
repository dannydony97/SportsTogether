import React, {FC, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginNavigator from '../LoginNavigator';
import {MainNavigatorParamsList, MainNavigatorProps} from './types';
import MenuNavigator from '../MenuNavigator';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useAuthentification} from '../../providers/AuthentificationProvider';

const Stack = createNativeStackNavigator<MainNavigatorParamsList>();

const MainNavigator: FC<MainNavigatorProps> = ({}) => {
  const {user} = useAuthentification();

  const navigation = useNavigation<NavigationProp<MainNavigatorParamsList>>();

  useEffect(() => {
    console.log('Value of the user: ', user);
    if (user) {
      navigation.navigate('MenuNavigator', {});
    }
  }, [navigation, user]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="LoginNavigator" component={LoginNavigator} />
      <Stack.Screen name="MenuNavigator" component={MenuNavigator} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
