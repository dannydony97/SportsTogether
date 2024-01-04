import React, {FC, useEffect} from 'react';
import {MainNavigatorScreenProps} from './types';
import Screen from '../../components/Screen';
import {useUser} from '../../providers/UserProvider';
import {LoaderScreen} from 'react-native-ui-lib';
import {useAuthentification} from '../../providers/AuthentificationProvider';

const LoadingScreen: FC<MainNavigatorScreenProps<'Loading'>> = ({navigation}) => {
  /**
   * Authentificated user
   */
  const {user} = useAuthentification();

  /**
   * User's properties
   */
  const {userProps} = useUser();

  useEffect(() => {
    if (user === null || userProps === null) {
      navigation.navigate('LoginNavigator', {});
    } else if (userProps !== undefined) {
      navigation.navigate('HomeNavigator', {});
    }
  }, [navigation, user, userProps]);

  return (
    <Screen style={{justifyContent: 'center'}}>
      <LoaderScreen />
    </Screen>
  );
};

export default LoadingScreen;
