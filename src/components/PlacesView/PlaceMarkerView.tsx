import React, {FC, useEffect, useRef} from 'react';
import {PlaceViewMarkerProps} from './types';
import {Image, View} from 'react-native-ui-lib';
import {Animated} from 'react-native';

const PLACE_VIEW_MARKER_SIZE = 50;

const PlaceViewMarker: FC<PlaceViewMarkerProps> = ({image, selected}) => {
  const scale = useRef(new Animated.Value(1));

  useEffect(() => {
    if (selected) {
      Animated.spring(scale.current, {
        toValue: 2,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(scale.current, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [selected]);

  return (
    <Animated.View
      style={[
        {
          alignItems: 'center',
          overflow: 'hidden',
        },
        {
          transform: [{scale: scale.current}],
        },
      ]}>
      <Image
        style={{
          borderColor: 'white',
          borderWidth: 2,
          width: PLACE_VIEW_MARKER_SIZE,
          height: PLACE_VIEW_MARKER_SIZE,
          borderRadius: PLACE_VIEW_MARKER_SIZE / 2,
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
    </Animated.View>
  );
};

export default PlaceViewMarker;
