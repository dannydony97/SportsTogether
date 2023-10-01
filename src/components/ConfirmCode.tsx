import React, {forwardRef} from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {CodeField, Cursor, useClearByFocusCell} from 'react-native-confirmation-code-field';
import {Surface, Text} from 'react-native-paper';
import {ConfirmCodeProps} from './types';

const ConfirmCode = forwardRef<TextInput, ConfirmCodeProps>(({value, setValue, ...codeFieldProps}, ref) => {
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      cellCount={6}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      value={value}
      onChangeText={setValue}
      renderCell={({index, symbol, isFocused}) => (
        <Surface style={{borderRadius: 10}} key={index}>
          <Text style={[styles.cell]} onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        </Surface>
      )}
      {...codeFieldProps}
    />
  );
});

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});

export default ConfirmCode;
