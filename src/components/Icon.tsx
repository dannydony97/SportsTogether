import React, {FC} from 'react';
import {useTheme} from 'react-native-paper';
import {IconProps} from 'react-native-vector-icons/Icon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const MaterialIcon: FC<IconProps> = props => {
  const theme = useTheme();

  return <MaterialIcons color={theme.colors.onSurface} {...props} />;
};

export {MaterialIcon};
