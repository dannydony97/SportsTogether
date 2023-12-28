import React, {FC} from 'react';
import {IconProps} from 'react-native-vector-icons/Icon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';

const MaterialIcon: FC<IconProps> = (iconProps: IconProps) => {
  return <MaterialIcons {...iconProps} />;
};

const Ionicon: FC<IconProps> = (iconProps: IconProps) => {
  return <Ionicons {...iconProps} />;
};

const FontAwesome5: FC<IconProps> = (iconProps: IconProps) => {
  return <FontAwesome5Icons {...iconProps} />;
};

export {MaterialIcon, Ionicon, FontAwesome5};
