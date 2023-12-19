import React, {FC} from 'react';
import {HomeNavigatorScreenProps} from './types';
import {Screen} from 'react-native-screens';
import {Text} from 'react-native-ui-lib';

const HomeScreen: FC<HomeNavigatorScreenProps<'Home'>> = () => {
  return (
    <Screen>
      <Text>Home: TODO</Text>
    </Screen>
  );
};

export default HomeScreen;
