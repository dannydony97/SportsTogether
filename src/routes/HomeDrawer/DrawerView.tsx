import {DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import React, {FC} from 'react';
import {Image, Text, View} from 'react-native-ui-lib';
import {useUser} from '../../providers/UserProvider';

const PROFILE_PICTURE_SIZE = 90;

const DrawerView: FC<DrawerContentComponentProps> = props => {
  /**
   * User's properies
   */
  const {userProps} = useUser();

  return (
    <DrawerContentScrollView {...props}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../../../assets/blank-profile-picture.jpg')}
          style={{width: PROFILE_PICTURE_SIZE, height: PROFILE_PICTURE_SIZE, borderRadius: PROFILE_PICTURE_SIZE / 2}}
        />
        <Text>{userProps?.displayName}</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default DrawerView;
