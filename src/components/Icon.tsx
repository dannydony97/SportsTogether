import React, {forwardRef} from 'react';
import {IconProps} from 'react-native-vector-icons/Icon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';

const MaterialIcon = forwardRef<MaterialIcons, IconProps>((iconProps, ref) => {
  return <MaterialIcons ref={ref} {...iconProps} />;
});

const Ionicon = forwardRef<Ionicons, IconProps>((iconProps, ref) => {
  return <Ionicons ref={ref} {...iconProps} />;
});

const FontAwesome5 = forwardRef<FontAwesome5Icons, IconProps>((iconProps, ref) => {
  return <FontAwesome5Icons ref={ref} {...iconProps} />;
});

export {MaterialIcon, Ionicon, FontAwesome5};
