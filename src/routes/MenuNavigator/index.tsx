import React, {FC} from 'react';
import {MenuNavigatorParamsList} from './types';
import {MainNavigatorScreenProps} from '../MainNavigator/types';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeNavigator from '../HomeNavigator';

const Tab = createBottomTabNavigator<MenuNavigatorParamsList>();

const MenuNavigator: FC<MainNavigatorScreenProps<'MenuNavigator'>> = () => {
  return (
    <Tab.Navigator initialRouteName="HomeNavigator" screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{
          title: 'Home',
        }}
      />
    </Tab.Navigator>
  );
};

export default MenuNavigator;
