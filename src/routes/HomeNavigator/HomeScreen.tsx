import React, {FC, useEffect} from 'react';
import {View} from 'react-native-ui-lib';
import {HomeNavigatorScreenProps} from './types';
import PlacesView from '../../components/PlacesView';
import PlacesProvider from '../../providers/PlacesProvider';

const HomeScreen: FC<HomeNavigatorScreenProps<'Home'>> = () => {
  useEffect(() => {});

  return (
    <View flex>
      <PlacesProvider>
        <PlacesView style={{flex: 1}} />
      </PlacesProvider>
    </View>
  );
};

export default HomeScreen;
