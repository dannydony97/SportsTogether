import React, {FC} from 'react';
import {WizardComponentProps} from '.';
import {Text, View} from 'react-native-ui-lib';
import ProfilePicture from '../../../components/ProfilePicture';

const UploadProfilePicture: FC<WizardComponentProps> = ({updateUserProps}) => {
  const onUpdateProfilePicture = async (path: string): Promise<void> => {
    updateUserProps({photoURL: path});
  };

  return (
    <View flex>
      <Text text30R style={{marginVertical: 20}}>
        Upload a picture of yourself for your profile
      </Text>
      <ProfilePicture
        onUpdateProfilePicture={onUpdateProfilePicture}
        containerStyle={{alignSelf: 'center'}}
        size={200}
      />
    </View>
  );
};

export default UploadProfilePicture;
