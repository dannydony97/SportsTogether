import {DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
import React, {FC} from 'react';
import {Text, View} from 'react-native-ui-lib';
import {useUser} from '../../providers/UserProvider';
import ProfilePicture from '../../components/ProfilePicture';

const PROFILE_PICTURE_SIZE = 80;

const DrawerView: FC<DrawerContentComponentProps> = props => {
  /**
   * User's properies
   */
  const {userProps} = useUser();

  return (
    <DrawerContentScrollView {...props}>
      <View style={{alignItems: 'center'}}>
        <ProfilePicture size={PROFILE_PICTURE_SIZE} />
        <Text text70>{userProps?.displayName}</Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default DrawerView;
