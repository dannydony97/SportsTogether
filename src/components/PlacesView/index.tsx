import React, {FC, useRef, useState} from 'react';
import MapView, {Details, Marker, MarkerPressEvent, Region} from 'react-native-maps';
import {usePlaces} from '../../providers/PlacesProvider';
import {PlacesViewProps} from './types';
import PlaceViewMarker from './PlaceMarkerView';

const PlacesView: FC<PlacesViewProps> = ({...mapViewProps}) => {
  /**
   * Array of all places
   */
  const {places} = usePlaces();

  /**
   * Map View reference object
   */
  const mapViewRef = useRef<MapView>(null);

  /**
   * Current region on the map
   */
  const [region, setRegion] = useState<Region>();

  /**
   * Triggered when a marker has been pressed
   * @param e Marker press event
   */
  const onMarkerPress = (e: MarkerPressEvent): void => {
    const markerIndex = parseInt(e.nativeEvent.id, 10);
    const coordinates = places[markerIndex].coordinate;
    mapViewRef.current?.animateToRegion(
      {latitude: coordinates.latitude, longitude: coordinates.longitude, latitudeDelta: 0, longitudeDelta: 0},
      1000,
    );
  };

  const onRegionChange = (region: Region): void => {
    setRegion(region);
  };

  return (
    <MapView ref={mapViewRef} region={region} onRegionChange={onRegionChange} {...mapViewProps}>
      {places?.map(({coordinate, images}, index) => (
        <Marker
          identifier={String(index)}
          key={index}
          coordinate={{latitude: coordinate.latitude, longitude: coordinate.longitude}}
          onPress={onMarkerPress}>
          <PlaceViewMarker size={50} image={images[0]} />
        </Marker>
      ))}
    </MapView>
  );
};

export default PlacesView;
