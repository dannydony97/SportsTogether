import React, {FC} from 'react';
import {MenuNavigatorParamsList} from './types';
import {MainNavigatorScreenProps} from '../MainNavigator/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeNavigator from '../HomeNavigator';

const Tab = createBottomTabNavigator<MenuNavigatorParamsList>();

const MenuNavigator: FC<MainNavigatorScreenProps<'MenuNavigator'>> = () => {
  return (
    <Tab.Navigator initialRouteName="HomeNavigator">
      <Tab.Screen name="HomeNavigator" component={HomeNavigator} />
    </Tab.Navigator>
  );
};

export default MenuNavigator;
