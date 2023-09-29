import React, {FC} from 'react';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {getHeaderTitle} from '@react-navigation/elements';
import {Appbar} from 'react-native-paper';

const NavigationBar: FC<NativeStackHeaderProps> = ({navigation, route, options, back}) => {
  const title = getHeaderTitle(options, route.name);

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
};

export default NavigationBar;
