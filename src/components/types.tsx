import {Dispatch} from 'react';
import {TextInput, ViewProps} from 'react-native';
import {CodeFieldProps} from 'react-native-confirmation-code-field';
import {SurfaceProps} from 'react-native-paper';

/**
 * Screen properties
 */
export interface ScreenProps extends ViewProps {
  safeArea?: boolean;
  scrollEnabled?: boolean;
  headerUsing?: boolean;
}

/**
 * Char input component methods
 */
export interface CharInputMethods extends TextInput {}

/**
 * Char input component properties
 */
export interface CharInputProps extends Omit<SurfaceProps, 'children'> {
  /**
   * Label char
   */
  labelChar?: string;
  /**
   * Character value
   */
  char?: string;
  /**
   * Triggered when the char has been changed
   * @param char new character
   */
  onCharChange?: (char: string | undefined) => void;
  /**
   * Triggered when the keyboard backspace button has been pressed
   */
  onBackspace?: () => void;
}

/**
 * Confirm code component properties
 */
export interface ConfirmCodeProps extends Omit<CodeFieldProps, 'renderCell'> {
  value: string;
  setValue: Dispatch<string>;
}
