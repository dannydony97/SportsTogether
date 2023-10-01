import React, {FC} from 'react';
import {LoginNavigatorScreenProps} from './types';
import Screen from '../../components/Screen';
import {Text} from 'react-native-paper';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import ConfirmCode from '../../components/ConfirmCode';

const ConfirmNumberScreen: FC<LoginNavigatorScreenProps<'ConfirmNumber'>> = ({navigation, route}) => {
  /**
   * React navigation headert height
   */
  const headerHeight = useHeaderHeight();

  /**
   * Triggered when 'change' text has been pressed
   */
  const onChangePress = (): void => {
    navigation.goBack();
  };

  return (
    <Screen>
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={{flex: 1, padding: 30}}>
          <Text variant="headlineMedium">Verify your number</Text>
          <Text>Enter the code we've sent by text to {route.params.phoneNumber}</Text>
          <Text
            onPress={onChangePress}
            variant="bodyLarge"
            style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>
            Change
          </Text>
          <ConfirmCode rootStyle={{paddingTop: 20}} />
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default ConfirmNumberScreen;
