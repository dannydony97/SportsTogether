import React, {FC, useState} from 'react';
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
   * Current region on the map
   */
  const [region, setRegion] = useState<Region>();

  /**
   * Triggered when a marker has been pressed
   * @param e Marker press event
   */
  const onMarkerPress = (e: MarkerPressEvent): void => {
    const markerIndex = parseInt(e.nativeEvent.id, 10);

    setRegion({
      ...region!,
      latitude: places[markerIndex].coordinate.latitude,
      longitude: places[markerIndex].coordinate.longitude,
    });
  };

  const onRegionChange = (region: Region, details: Details): void => {
    setRegion(region);
  };

  return (
    <MapView region={region} onRegionChange={onRegionChange} {...mapViewProps}>
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
