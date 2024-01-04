import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeNavigatorParamsList} from './types';
import HomeScreen from './HomeScreen';
import {MainNavigatorScreenProps} from '../MainNavigator/types';

const Stack = createNativeStackNavigator<HomeNavigatorParamsList>();

const HomeNavigator: FC<MainNavigatorScreenProps<'HomeNavigator'>> = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
