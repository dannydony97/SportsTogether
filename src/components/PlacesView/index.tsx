import React, {FC, useEffect, useRef, useState} from 'react';
import MapView, {MapPressEvent, Marker, MarkerPressEvent} from 'react-native-maps';
import {usePlaces} from '../../providers/PlacesProvider';
import {PlacesViewProps} from './types';
import PlaceViewMarker from './PlaceMarkerView';
import {View} from 'react-native-ui-lib';
import PlacesBottomSheetView from './PlacesBottomSheetView';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {PlaceData, WithID} from '../../api/datamodel/types';

const PlacesView: FC<PlacesViewProps> = ({...viewProps}) => {
  /**
   * Array of all places
   */
  const {places} = usePlaces();

  /**
   * Map View reference object
   */
  const mapViewRef = useRef<MapView>(null);

  /**
   * Index of the current selected place
   */
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>();

  /**
   * Data of the current selected place
   */
  const [selectedPlace, setSelectedPlace] = useState<WithID<PlaceData>>();

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
    <BottomSheetModalProvider>
      <View flex {...viewProps}>
        <MapView style={{flex: 1}} ref={mapViewRef} onPress={onMapPress}>
          {places?.map(({id, coordinate, images}, index) => (
            <Marker
              identifier={id}
              key={index}
              coordinate={{latitude: coordinate.latitude, longitude: coordinate.longitude}}>
              <PlaceViewMarker image={images[0]} selected={id === selectedPlaceId} />
            </Marker>
          ))}
        </MapView>
        <PlacesBottomSheetView placeData={selectedPlace} />
      </View>
    </BottomSheetModalProvider>
  );
};

export default PlacesView;
