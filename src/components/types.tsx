import {Dispatch} from 'react';
import {TextInput} from 'react-native';
import {CodeFieldProps} from 'react-native-confirmation-code-field';
import {SafeAreaViewProps} from 'react-native-safe-area-context';
import {AvatarProps, ViewProps} from 'react-native-ui-lib';

/**
 * Screen properties
 */
export interface ScreenProps extends SafeAreaViewProps {
  headerUsing?: boolean;
}

/**
 * Char input component methods
 */
export interface CharInputMethods extends TextInput {}

/**
 * Char input component properties
 */
export interface CharInputProps extends Omit<ViewProps, 'children'> {
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

/**
 * Loading view properties
 */
export interface LoadingViewProps extends ViewProps {}

/**
 * Profile picture properties
 */
export interface ProfilePictureProps extends AvatarProps {
  /**
   * Callback invoked after selelecting a new photo for profile picture
   * A button will appear under the current profile picture for selecting a new photo
   * @param path local path of the selected profile picture
   */
  onUpdateProfilePicture?: (path: string) => void;
}
