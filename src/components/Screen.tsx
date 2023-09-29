import React, {FC, PropsWithChildren} from 'react';
import {ScrollView, StyleProp, ViewStyle} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScreenProps} from './types';
import {useTheme} from 'react-native-paper';

const Screen: FC<PropsWithChildren<ScreenProps>> = ({children, safeArea, style, scrollEnabled, ...scrollViewProps}) => {
  // react native paper theme
  const theme = useTheme();

  // Safe area insets
  const insets = useSafeAreaInsets();
  const scrollViewStyle: StyleProp<ViewStyle> = {
    backgroundColor: theme.colors.background,
    paddingTop: safeArea ? insets.top : 0,
    paddingBottom: safeArea ? insets.bottom : 0,
    paddingLeft: safeArea ? insets.left : 0,
    paddingRight: safeArea ? insets.right : 0,
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="always"
      contentContainerStyle={{flex: 1}}
      scrollEnabled={!scrollEnabled ? false : true}
      style={[scrollViewStyle, style]}
      {...scrollViewProps}>
      {children}
    </ScrollView>
  );
};

export default Screen;
