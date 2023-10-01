import React, {FC, useRef, useState} from 'react';
import {LoginNavigatorScreenProps} from './types';
import Screen from '../../components/Screen';
import {HelperText, IconButton, Text, TextInput} from 'react-native-paper';
import {Pressable, TextInput as RNTextInput, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {MaterialIcon} from '../../components/Icon';
import {useAuthentification} from '../../providers/AuthentificationProvider';

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
          <Text variant="headlineMedium">What's your number?</Text>
          <View style={{flexDirection: 'row', paddingTop: 30}}>
            <Pressable onPress={onCountryPress}>
              <TextInput
                onPressOut={onCountryPress}
                style={{marginRight: 10}}
                label="Country"
                mode="outlined"
                editable={false}
                value={route.params.countryCallingCode}
              />
            </Pressable>
            <View style={{flex: 3}}>
              <TextInput
                error={phoneNumberMessage.length ? true : false}
                ref={phoneNumberTextInputRef}
                value={phoneNumber}
                onChangeText={onPhoneNumberTextChanged}
                label="Phone number"
                mode="outlined"
                keyboardType="numeric"
              />
              <HelperText type="error">{phoneNumberMessage}</HelperText>
            </View>
          </View>
        </View>
        <IconButton
          style={{alignSelf: 'flex-end'}}
          onPress={onNextPress}
          size={40}
          icon={props => <MaterialIcon {...props} name="chevron-right" />}
        />
      </View>
    </Screen>
  );
};

export default MobileNumberScreen;
