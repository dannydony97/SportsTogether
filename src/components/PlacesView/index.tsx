import React, {FC, useEffect, useState} from 'react';
import MapView, {MapPressEvent, Marker, MarkerPressEvent} from 'react-native-maps';
import {usePlaces} from '../../providers/PlacesProvider';
import {PlacesViewProps} from './types';
import PlaceViewMarker from './PlaceMarkerView';
import {Button, View} from 'react-native-ui-lib';
import PlacesBottomSheetView from './PlacesBottomSheetView';
import {PlaceData, WithID} from '../../api/datamodel/types';
import {FontAwesome5} from '../Icon';
import Animated, {useAnimatedReaction, useSharedValue} from 'react-native-reanimated';

const PlacesView: FC<PlacesViewProps> = ({...viewProps}) => {
  /**
   * Array of all places
   */
  const {places} = usePlaces();

  /**
   * Index of the current selected place
   */
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>();

  /**
   * Data of the current selected place
   */
  const [selectedPlace, setSelectedPlace] = useState<WithID<PlaceData>>();

  /**
   * Bottom sheet vertical position
   */
  const animatedPosition = useSharedValue(0);

  const translateY = useSharedValue(0);

  useAnimatedReaction(
    () => {
      return animatedPosition.value;
    },
    (prepared, previous) => {
      console.log(prepared, previous);
      if (!previous) {
        return;
      }

      translateY.value += prepared - previous;
    },
  );

  /**
   * Hook for catching the changing of the current selected place
   */
  useEffect(() => {
    setSelectedPlace(places.find(place => place.id === selectedPlaceId));
  }, [places, selectedPlaceId]);

  /**
   * Triggered when a location from the map has been pressed
   */
  const onMapPress = (e: MapPressEvent): void => {
    if (e.nativeEvent.action === 'marker-press') {
      setSelectedPlaceId((e as MarkerPressEvent).nativeEvent.id);
    } else {
      setSelectedPlaceId(undefined);
    }
  };

  return (
    <View flex {...viewProps}>
      <MapView style={{flex: 1}} onPress={onMapPress}>
        {places?.map(({id, coordinate, images}, index) => (
          <Marker
            identifier={id}
            key={index}
            coordinate={{latitude: coordinate.latitude, longitude: coordinate.longitude}}>
            <PlaceViewMarker image={images[0]} selected={id === selectedPlaceId} />
          </Marker>
        ))}
      </MapView>
      <Animated.View style={[{position: 'absolute', bottom: 10, right: 10}, {transform: [{translateY}]}]}>
        <Button
          enableShadow
          style={{backgroundColor: 'white', padding: 13}}
          iconSource={() => <FontAwesome5 name="location-arrow" size={20} />}
        />
      </Animated.View>
      <PlacesBottomSheetView animatedPosition={animatedPosition} placeData={selectedPlace} />
    </View>
  );
};

export default PlacesView;
