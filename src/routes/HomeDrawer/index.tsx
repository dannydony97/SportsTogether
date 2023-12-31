import React, {FC} from 'react';
import {HomeNavigatorParamsList} from './types';
import HomeScreen from './HomeScreen';
import {MainNavigatorScreenProps} from '../MainNavigator/types';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerView from './DrawerView';

const Drawer = createDrawerNavigator<HomeNavigatorParamsList>();

const HomeDrawer: FC<MainNavigatorScreenProps<'HomeNavigator'>> = () => {
  return (
    <Drawer.Navigator drawerContent={props => <DrawerView {...props} />} initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;
