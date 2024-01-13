import React, {FC} from 'react';
import {WizardComponentProps} from '.';
import {Text, TextField, View} from 'react-native-ui-lib';

const GetName: FC<WizardComponentProps> = ({userProps, updateUserProps}) => (
  <View flex>
    <Text text30R style={{marginVertical: 20}}>
      What's your name?
    </Text>
    <TextField
      value={userProps.displayName ?? ''}
      onChangeText={text => updateUserProps({displayName: text})}
      placeholder="Name"
      floatingPlaceholder
      text50T
    />
  </View>
);

export default GetName;
