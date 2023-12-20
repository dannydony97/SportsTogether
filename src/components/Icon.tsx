import React, {FC} from 'react';
import {IconProps} from 'react-native-vector-icons/Icon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const MaterialIcon: FC<IconProps> = (iconProps: IconProps) => {
  return <MaterialIcons {...iconProps} />;
};

const Ionicon: FC<IconProps> = (iconProps: IconProps) => {
  return <Ionicons {...iconProps} />;
};

export {MaterialIcon, Ionicon};
