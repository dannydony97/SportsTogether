import React, {FC} from 'react';
import {Button, View} from 'react-native-ui-lib';
import {HomeNavigatorScreenProps} from './types';
import PlacesView from '../../components/PlacesView';
import PlacesProvider from '../../providers/PlacesProvider';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MaterialIcon} from '../../components/Icon';

const HomeScreen: FC<HomeNavigatorScreenProps<'Home'>> = ({navigation}) => {
  /**
   * Triggered when the menu button has been pressed
   */
  const onMenuButtonPress = (): void => {
    navigation.toggleDrawer();
  };

  return (
    <View flex>
      <PlacesProvider>
        <PlacesView />
      </PlacesProvider>
      <SafeAreaView style={{position: 'absolute', paddingHorizontal: 10}}>
        <Button
          enableShadow
          style={{backgroundColor: 'white', padding: 13}}
          iconSource={() => <MaterialIcon name="menu" size={20} />}
          onPress={onMenuButtonPress}
        />
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
