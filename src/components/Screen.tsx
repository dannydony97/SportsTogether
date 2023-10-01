import React, {FC} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, StyleProp, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScreenProps} from './types';
import {useTheme} from 'react-native-paper';
import {useHeaderHeight} from '@react-navigation/elements';

const Screen: FC<ScreenProps> = ({children, safeArea, scrollEnabled, headerUsing, ...viewProps}) => {
  // react native paper theme
  const theme = useTheme();

  /**
   * React navigation headert height
   */
  const headerHeight = useHeaderHeight();

  // Safe area insets
  const insets = useSafeAreaInsets();
  const safeAreaStyle: StyleProp<ViewStyle> = {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: safeArea ? insets.top : 0,
    paddingBottom: safeArea ? insets.bottom : 0,
    paddingLeft: safeArea ? insets.left : 0,
    paddingRight: safeArea ? insets.right : 0,
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerUsing ? headerHeight : 0}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={safeAreaStyle}
      {...viewProps}>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{flex: 1}}
        scrollEnabled={!scrollEnabled ? false : true}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Screen;
