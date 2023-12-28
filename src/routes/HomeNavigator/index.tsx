import React, {FC, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeNavigatorParamsList} from './types';
import CreateAccountWizardScreen from './CreateAccountWizardScreen';
import HomeScreen from './HomeScreen';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {useUser} from '../../providers/UserProvider';
import {MainNavigatorScreenProps} from '../MainNavigator/types';

const Stack = createNativeStackNavigator<HomeNavigatorParamsList>();

const HomeNavigator: FC<MainNavigatorScreenProps<'HomeNavigator'>> = () => {
  /**
   * Navigation object instance
   */
  const navigation = useNavigation<NavigationProp<HomeNavigatorParamsList>>();

  /**
   * User's document object instance
   */
  const {userProps} = useUser();

  useEffect(() => {
    if (userProps === null) {
      navigation.navigate('CreateAccountWizard', {});
    } else {
      navigation.navigate('Home', {});
    }
  }, [navigation, userProps]);

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Group>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'fullScreenModal', headerShown: false}}>
        <Stack.Screen name="CreateAccountWizard" component={CreateAccountWizardScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default HomeNavigator;
