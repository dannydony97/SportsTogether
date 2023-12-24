import React, {FC, useEffect, useRef} from 'react';
import {PlaceViewMarkerProps} from './types';
import {View} from 'react-native-ui-lib';
import {Animated} from 'react-native';

const PLACE_VIEW_MARKER_SIZE = 50;

const PlaceViewMarker: FC<PlaceViewMarkerProps> = ({image, selected}) => {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (selected) {
      Animated.spring(scale, {
        toValue: 10,
        useNativeDriver: true,
      });
    } else {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      });
    }
  });

  return (
    <View style={{alignItems: 'center'}}>
      <Animated.Image
        style={[
          {
            width: PLACE_VIEW_MARKER_SIZE,
            height: PLACE_VIEW_MARKER_SIZE,
            borderRadius: PLACE_VIEW_MARKER_SIZE / 2,
            borderColor: 'white',
            borderWidth: 2,
          },
          {transform: [{scale: scale}]},
        ]}
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
