import React, {FC, useRef, useState} from 'react';
import {LoginNavigatorScreenProps} from './types';
import Screen from '../../components/Screen';
import {Pressable, TextInput as RNTextInput} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useAuthentification} from '../../providers/AuthentificationProvider';
import {Button, Text, TextField, View} from 'react-native-ui-lib';

const MobileNumberScreen: FC<LoginNavigatorScreenProps<'MobileNumber'>> = ({navigation, route}) => {
  /**
   * Methods that signs the user with a phone number
   */
  const {signInWithPhoneNumber} = useAuthentification();

  /**
   * Phone number
   */
  const [phoneNumber, setPhoneNumber] = useState('');

  /**
   * Valid phone number error message
   */
  const [phoneNumberMessage, setPhoneNumberMessage] = useState('');

  /**
   * Phone number text input reference
   */
  const phoneNumberTextInputRef = useRef<RNTextInput>(null);

  /**
   * Focus the phone number text input
   */
  useFocusEffect(() => {
    phoneNumberTextInputRef.current?.focus();
  });

  /**
   * Triggered when the 'Country' button has been pressed
   */
  const onCountryPress = (): void => {
    navigation.navigate('CountryCodes', {});
  };

  /**
   * Triggered when the value of the phone number text input has been changed
   * @param value new text input value
   */
  const onPhoneNumberTextChanged = (value: string): void => {
    setPhoneNumber(value);
    setPhoneNumberMessage('');
  };

  /**
   * Triggered when the next button has been pressed
   */
  const onNextPress = async (): Promise<void> => {
    const fullPhoneNumber = route.params.countryCallingCode + phoneNumber;
    try {
      await signInWithPhoneNumber(fullPhoneNumber);
    } catch {
      setPhoneNumberMessage('Phone number is invalid!');
      return;
    }

    navigation.navigate('ConfirmNumber', {phoneNumber: fullPhoneNumber});
  };

  return (
    <Screen headerUsing>
      <View style={{flex: 1, padding: 30}}>
        <View style={{flex: 1}}>
          <Text text30>What's your number?</Text>
          <View style={{flexDirection: 'row', paddingTop: 30}}>
            <Pressable onPress={onCountryPress}>
              <TextField
                onPressOut={onCountryPress}
                style={{marginRight: 10}}
                label="Country"
                editable={false}
                value={route.params.countryCallingCode}
              />
            </Pressable>
            <View style={{flex: 3}}>
              <TextField
                ref={phoneNumberTextInputRef}
                value={phoneNumber}
                onChangeText={onPhoneNumberTextChanged}
                label="Phone number"
                validationMessage={phoneNumberMessage}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
        <Button style={{alignSelf: 'flex-end'}} onPress={onNextPress} />
      </View>
    </Screen>
  );
};

export default MobileNumberScreen;
