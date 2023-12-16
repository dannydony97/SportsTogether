import React, {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MenuNavigatorParamsList} from './types';
import {MainNavigatorScreenProps} from '../MainNavigator/types';
import CreateAccountWizardScreen from './CreateAccountWizardScreen';

const Stack = createNativeStackNavigator<MenuNavigatorParamsList>();

const MenuNavigator: FC<MainNavigatorScreenProps<'MenuNavigator'>> = () => {
  return (
    <Stack.Navigator initialRouteName="CreateAccountWizard">
      <Stack.Screen name="CreateAccountWizard" component={CreateAccountWizardScreen} />
    </Stack.Navigator>
  );
};

export default MenuNavigator;
