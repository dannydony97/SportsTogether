import React, {FC} from 'react';
import {CurrentPositionMarkerProps} from './types';
import {Colors, View} from 'react-native-ui-lib';

const POSITION_MARKER_SIZE = 17;

const CurrentPositionMarker: FC<CurrentPositionMarkerProps> = () => {
  return (
    <View>
      <View
        style={{
          width: POSITION_MARKER_SIZE,
          height: POSITION_MARKER_SIZE,
          borderRadius: POSITION_MARKER_SIZE / 2,
          backgroundColor: Colors.$iconPrimary,
          borderWidth: 2,
          borderColor: 'white',
        }}
      />
    </View>
  );
};

export default CurrentPositionMarker;
