import React, {FC, useRef} from 'react';
import {LoginNavigatorScreenProps} from './types';
import Screen from '../../components/Screen';
import {Surface, Text, TextInput} from 'react-native-paper';
import {KeyboardAvoidingView, Platform, Pressable, TextInput as RNTextInput, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/elements';
import {MaterialIcon} from '../../components/Icon';

const MobileNumberScreen: FC<LoginNavigatorScreenProps<'MobileNumber'>> = ({navigation, route}) => {
  /**
   * Phone number text input reference
   */
  const phoneNumberTextInputRef = useRef<RNTextInput>(null);

  /**
   * Triggered when the 'Country' button has been pressed
   */
  const onCountryPress = () => {
    navigation.navigate('CountryCodes', {});
  };

  /**
   * Focus the phone number text input
   */
  useFocusEffect(() => {
    phoneNumberTextInputRef.current?.focus();
  });

  const headerHeight = useHeaderHeight();

  return (
    <Screen>
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <View style={{flex: 1, padding: 30}}>
          <View style={{flex: 1}}>
            <Text variant="headlineMedium">What's your number?</Text>
            <View style={{flexDirection: 'row', paddingTop: 30}}>
              <Pressable onPress={onCountryPress}>
                <TextInput
                  onPressOut={onCountryPress}
                  style={{flex: 1, marginRight: 10}}
                  label="Country"
                  mode="outlined"
                  editable={false}
                  value={route.params.countryCallingCode}
                />
              </Pressable>
              <TextInput
                ref={phoneNumberTextInputRef}
                style={{flex: 3}}
                label="Phone number"
                mode="outlined"
                keyboardType="numeric"
              />
            </View>
          </View>
          <Surface style={{alignSelf: 'flex-end', borderRadius: 25}}>
            <MaterialIcon name="chevron-right" size={50} />
          </Surface>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default MobileNumberScreen;
