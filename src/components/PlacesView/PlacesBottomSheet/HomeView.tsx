import React, {FC} from 'react';
import {HomeViewProps} from '../types';
import {Colors, View} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import BottomSheetTextField from './BottomSheetTextField';
import {MaterialIcon} from '../../Icon';

const HomeView: FC<HomeViewProps> = () => {
  return (
    <View style={{paddingHorizontal: 10}}>
      <BottomSheetTextField
        leadingAccessory={<MaterialIcon name="search" size={20} color={Colors.grey30} />}
        placeholder="Looking for a place?"
        fieldStyle={styles.searchBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: Colors.grey60,
    padding: 10,
    borderRadius: 10,
  },
});

export default HomeView;
