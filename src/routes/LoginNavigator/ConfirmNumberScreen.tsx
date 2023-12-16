import React, {FC, useRef, useState} from 'react';
import {LoginNavigatorScreenProps} from './types';
import Screen from '../../components/Screen';
import {TextInput, View} from 'react-native';
import ConfirmCode from '../../components/ConfirmCode';
import {useFocusEffect} from '@react-navigation/native';
import {useAuthentification} from '../../providers/AuthentificationProvider';
import {Button, Text} from 'react-native-ui-lib';

const ConfirmNumberScreen: FC<LoginNavigatorScreenProps<'ConfirmNumber'>> = ({navigation, route}) => {
  /**
   * Methods that signs the user with a phone number
   */
  const {confirmCode} = useAuthentification();

  /**
   * Confirm code reference object
   */
  const confirmCodeRef = useRef<TextInput>(null);

  /**
   * Confirm code error messsage
   */
  const [confirmCodeMessage, setConfirmCodeMessage] = useState('');

  /**
   * Confirm code value
   */
  const [confirmCodeValue, setConfirmCodeValue] = useState('');

  /**
   * Focus the phone number text input
   */
  useFocusEffect(() => {
    confirmCodeRef.current?.focus();
  });

  /**
   * Triggered when 'change' text has been pressed
   */
  const onChangePress = (): void => {
    navigation.goBack();
  };

  /**
   * Triggered when the next button has been pressed
   */
  const onNextPress = async (): Promise<void> => {
    const result = await confirmCode(confirmCodeValue);
    if (!result) {
      setConfirmCodeMessage('Confirmation code is invalid!');
      return;
    }

    navigation.navigate('CreateAccountWizard', {});
  };

  return (
    <Screen>
      <View style={{flex: 1, padding: 30}}>
        <View style={{flex: 1}}>
          <Text>Verify your number</Text>
          <Text>Enter the code we've sent by text to {route.params.phoneNumber}</Text>
          <Text onPress={onChangePress} style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>
            Change
          </Text>
          <ConfirmCode
            value={confirmCodeValue}
            setValue={setConfirmCodeValue}
            ref={confirmCodeRef}
            rootStyle={{paddingVertical: 20}}
          />
          <Text>{confirmCodeMessage}</Text>
        </View>
        <Button disabled={confirmCodeValue.length < 6} style={{alignSelf: 'flex-end'}} onPress={onNextPress} />
      </View>
    </Screen>
  );
};

export default ConfirmNumberScreen;
