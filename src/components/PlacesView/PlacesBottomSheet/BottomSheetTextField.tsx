import {useBottomSheetInternal} from '@gorhom/bottom-sheet';
import React, {forwardRef, useCallback, useEffect} from 'react';
import {NativeSyntheticEvent, TextInput, TextInputFocusEventData} from 'react-native';
import {TextField, TextFieldProps} from 'react-native-ui-lib';

const BottomSheetTextField = forwardRef<TextInput, TextFieldProps>(({onFocus, onBlur, ...textFieldProps}, ref) => {
  const {shouldHandleKeyboardEvents} = useBottomSheetInternal();

  useEffect(() => {
    return () => {
      shouldHandleKeyboardEvents.value = false;
    };
  });

  const handleOnFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      shouldHandleKeyboardEvents.value = true;
      if (onFocus) {
        onFocus(e);
      }
    },
    [onFocus, shouldHandleKeyboardEvents],
  );

  const handleOnBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      shouldHandleKeyboardEvents.value = false;
      if (onBlur) {
        onBlur(e);
      }
    },
    [onBlur, shouldHandleKeyboardEvents],
  );

  return <TextField ref={ref} onFocus={handleOnFocus} onBlur={handleOnBlur} {...textFieldProps} />;
});

export default BottomSheetTextField;
