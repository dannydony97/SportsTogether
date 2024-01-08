import React, {FC} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import {Edge, SafeAreaView} from 'react-native-safe-area-context';
import {ScreenProps} from './types';
import {Colors} from 'react-native-ui-lib';

const Screen: FC<ScreenProps> = ({children, headerUsing, style, ...safeAreaViewProps}) => {
  return (
    <SafeAreaView
      edges={['left', 'right', 'bottom', ...(!headerUsing ? (['top'] as Edge[]) : [])]}
      style={[styles.safeArea, style]}
      {...safeAreaViewProps}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardAvoiding}>
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.$backgroundDefault,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
});

export default Screen;
