import React, {FC} from 'react';
import {IconProps} from 'react-native-vector-icons/Icon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MaterialIcon: FC<IconProps> = ({name, size, color}: IconProps) => {
  return <MaterialIcons name={name} size={size} color={color} />;
};

export {MaterialIcon};
