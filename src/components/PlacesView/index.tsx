import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import MapView, {LatLng, MapPressEvent, Marker, MarkerPressEvent} from 'react-native-maps';
import {usePlaces} from '../../providers/PlacesProvider';
import {PlacesViewProps} from './types';
import PlaceMarker from './PlaceMarker';
import {Button, View} from 'react-native-ui-lib';
import PlacesBottomSheet from './PlacesBottomSheet';
import {PlaceData, WithID} from '../../api/datamodel/types';
import {FontAwesome5} from '../Icon';
import Animated, {useSharedValue} from 'react-native-reanimated';
import Geolocation from '@react-native-community/geolocation';
import CurrentPositionMarker from './CurrentPositionMarker';

const PlacesView: FC<PlacesViewProps> = ({...viewProps}) => {
  /**
   * Array of all places
   */
  const {places} = usePlaces();

  /**
   * Map view reference object
   */
  const mapViewRef = useRef<MapView>(null);

  /**
   * Index of the current selected place
   */
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>();

  //#region Bottom sheet props

  /**
   * Data of the current selected place
   */
  const [selectedPlace, setSelectedPlace] = useState<WithID<PlaceData>>();

  /**
   * Bottom sheet vertical translation
   */
  const translateY = useSharedValue(0);

  //#endregion

  /**
   * Current location
   */
  const [currentPosition, setCurrentPosition] = useState<LatLng>({latitude: 0, longitude: 0});

  /**
   * Retrieves the current position
   */
  const moveToPosition = useCallback((coordinates: LatLng, position: 'center' | 'top-center' = 'center'): void => {
    mapViewRef.current?.animateToRegion({
      latitude: coordinates.latitude - (position === 'top-center' ? 0.015 : 0),
      longitude: coordinates.longitude,
      latitudeDelta: 0.06,
      longitudeDelta: 0.004,
    });
  }, []);

  const updateCurrentPosition = useCallback((): void => {
    Geolocation.getCurrentPosition(position => {
      setCurrentPosition({latitude: position.coords.latitude, longitude: position.coords.longitude});
    });
  }, []);

  const watchPosition = useCallback((): number => {
    return Geolocation.watchPosition(position => {
      setCurrentPosition({latitude: position.coords.latitude, longitude: position.coords.longitude});
    });
  }, []);

  /**
   * Hook for setting the current location
   */
  useEffect(() => {
    updateCurrentPosition();
    const watchId = watchPosition();
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [updateCurrentPosition, watchPosition]);

  /**
   * Hook for catching the changing of the current selected place
   */
  useEffect(() => {
    setSelectedPlace(places.find(place => place.id === selectedPlaceId));
  }, [places, selectedPlaceId]);

  /**
   * Hook for setting the map position on the selected place
   */
  useEffect(() => {
    if (!selectedPlace) {
      return;
    }
    moveToPosition(
      {latitude: selectedPlace.coordinate.latitude, longitude: selectedPlace.coordinate.longitude},
      'top-center',
    );
  }, [moveToPosition, selectedPlace]);

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

  /**
   * Triggered when the current position button has been pressed
   */
  const onCurrentPositionPress = (): void => {
    moveToPosition(currentPosition);
  };

  return (
    <View flex {...viewProps}>
      <MapView ref={mapViewRef} style={{flex: 1}} onPress={onMapPress}>
        <Marker coordinate={currentPosition}>
          <CurrentPositionMarker />
        </Marker>
        {places?.map(({id, coordinate, images}, index) => (
          <Marker
            identifier={id}
            key={index}
            coordinate={{latitude: coordinate.latitude, longitude: coordinate.longitude}}>
            <PlaceMarker image={images[0]} selected={id === selectedPlaceId} />
          </Marker>
        ))}
      </MapView>
      <Animated.View style={[{position: 'absolute', bottom: 10, right: 10}, {transform: [{translateY}]}]}>
        <Button
          enableShadow
          style={{backgroundColor: 'white', padding: 13}}
          iconSource={() => <FontAwesome5 name="location-arrow" size={20} />}
          onPress={onCurrentPositionPress}
        />
      </Animated.View>
      <PlacesBottomSheet translateY={translateY} placeData={selectedPlace} />
    </View>
  );
};

export default PlacesView;
