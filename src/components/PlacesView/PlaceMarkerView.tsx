import React, {FC} from 'react';
import {PlaceViewMarkerProps} from './types';
import {Image, View} from 'react-native-ui-lib';

const PlaceViewMarker: FC<PlaceViewMarkerProps> = ({size, image}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Image
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderColor: 'white',
          borderWidth: 2,
        }}
        source={{uri: image}}
      />
      <View
        style={{
          top: -1,
          width: 0,
          height: 0,
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderLeftWidth: 4,
          borderRightWidth: 4,
          borderTopWidth: 7,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderTopColor: 'white',
        }}
      />
    </View>
  );
};

export default PlaceViewMarker;
