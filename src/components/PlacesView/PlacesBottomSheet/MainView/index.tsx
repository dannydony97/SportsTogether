import React, {FC, useState} from 'react';
import {MainViewProps} from '../../types';
import {Colors, View} from 'react-native-ui-lib';
import {StyleSheet} from 'react-native';
import BottomSheetTextField from '../BottomSheetTextField';
import {MaterialIcon} from '../../../Icon';
import SearchView from './SearchView';
import HomeView from './HomeView';

const MainView: FC<MainViewProps> = ({}) => {
  const [searchVisible, setSearchVisible] = useState(false);

  /**
   * Triggered when the search text field has been focused
   */
  const onSearchFocus = (): void => {
    setSearchVisible(true);
  };

  return (
    <View style={{paddingHorizontal: 10}}>
      <BottomSheetTextField
        onFocus={onSearchFocus}
        leadingAccessory={<MaterialIcon name="search" size={20} color={Colors.grey30} />}
        placeholder="Search..."
        fieldStyle={styles.searchBar}
      />
      {searchVisible ? <SearchView /> : <HomeView />}
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

export default MainView;
