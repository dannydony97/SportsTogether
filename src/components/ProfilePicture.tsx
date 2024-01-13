import React, {FC, useRef, useState} from 'react';
import {ProfilePictureProps} from './types';
import {ActionSheet, Avatar, Button, View} from 'react-native-ui-lib';
import {ImageSourcePropType} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';

const ProfilePicture: FC<ProfilePictureProps> = ({onUpdateProfilePicture, ...avatarProps}) => {
  /**
   * Source of the profile picture
   */
  const [source, setSource] = useState<ImageSourcePropType>(require('../../assets/blank-profile-picture.jpg'));

  /**
   * Action sheet reference object
   */
  const [actionSheetVisible, setActionSheetVisible] = useState(false);

  /**
   * Tells if the action sheet can be dismissed or not
   */
  const canDismiss = useRef(true);

  /**
   * Triggered when the avatar has been pressed
   */
  const onPress = (): void => {
    setActionSheetVisible(true);
  };

  /**
   * Triggered when the 'Take a photo' button from the action sheet has been pressed
   */
  const onTakePhotoPress = async (): Promise<void> => {
    if (!onUpdateProfilePicture) {
      throw new Error("'onUpdateProfilePicture' cannot be null");
    }

    canDismiss.current = false;
    try {
      const result = await ImageCropPicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
      });
      setSource({uri: result.path});
      onUpdateProfilePicture(result.path);
    } catch {
      // Intentionally ignored
    }
    canDismiss.current = true;
    setActionSheetVisible(false);
  };

  /**
   * Triggered when the 'Choose from library' button from the action sheet has been pressed
   */
  const onChooseFromLibraryPress = async (): Promise<void> => {
    if (!onUpdateProfilePicture) {
      throw new Error("'onUpdateProfilePicture' cannot be null");
    }

    canDismiss.current = false;
    try {
      const result = await ImageCropPicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
      });
      setSource({uri: result.path});
      onUpdateProfilePicture(result.path);
    } catch {
      // Intentionally ignored
    }
    canDismiss.current = true;
    setActionSheetVisible(false);
  };

  /**
   * Triggered when the action sheet needs to be dismissed
   */
  const onActionSheetDismiss = (): void => {
    if (canDismiss.current) {
      setActionSheetVisible(false);
    }
  };

  return (
    <View>
      <Avatar source={source} {...avatarProps} />
      {onUpdateProfilePicture && (
        <View>
          <Button onPress={onPress} label="Choose a photo" style={{marginTop: 10}} />
          <ActionSheet
            destructiveButtonIndex={0}
            options={[
              {label: 'Take a photo', onPress: onTakePhotoPress},
              {label: 'Choose from library', onPress: onChooseFromLibraryPress},
            ]}
            onDismiss={onActionSheetDismiss}
            visible={actionSheetVisible}
          />
        </View>
      )}
    </View>
  );
};

export default ProfilePicture;
