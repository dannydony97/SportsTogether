import {ScrollViewProps, StyleProp, ViewStyle} from 'react-native';

/**
 * Screen properties
 */
export interface ScreenProps extends Omit<ScrollViewProps, 'scrollEnabled' | 'contentContainerStyle'> {
  safeArea?: boolean;
  scrollEnabled?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
}
