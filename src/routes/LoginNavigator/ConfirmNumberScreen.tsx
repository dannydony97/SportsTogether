import React, {FC, useRef, useState} from 'react';
import {LoginNavigatorScreenProps} from './types';
import Screen from '../../components/Screen';
import {HelperText, IconButton, Text} from 'react-native-paper';
import {TextInput, View} from 'react-native';
import ConfirmCode from '../../components/ConfirmCode';
import {MaterialIcon} from '../../components/Icon';
import {useFocusEffect} from '@react-navigation/native';
import {useAuthentification} from '../../providers/AuthentificationProvider';

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
    <Screen safeArea>
      <View style={{flex: 1, padding: 30}}>
        <View style={{flex: 1}}>
          <Text variant="headlineMedium">Verify your number</Text>
          <Text>Enter the code we've sent by text to {route.params.phoneNumber}</Text>
          <Text
            onPress={onChangePress}
            variant="bodyLarge"
            style={{fontWeight: 'bold', textDecorationLine: 'underline'}}>
            Change
          </Text>
          <ConfirmCode
            value={confirmCodeValue}
            setValue={setConfirmCodeValue}
            ref={confirmCodeRef}
            rootStyle={{paddingVertical: 20}}
          />
          <HelperText type="error">{confirmCodeMessage}</HelperText>
        </View>
        <IconButton
          disabled={confirmCodeValue.length < 6}
          style={{alignSelf: 'flex-end'}}
          onPress={onNextPress}
          size={40}
          icon={props => <MaterialIcon {...props} name="chevron-right" />}
        />
      </View>
    </Screen>
  );
};

export default ConfirmNumberScreen;
