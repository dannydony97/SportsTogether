import React, {FC} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {usePlaces} from '../../providers/PlacesProvider';
import {PlacesViewProps} from './types';
import PlaceViewMarker from './PlaceMarkerView';

const PlacesView: FC<PlacesViewProps> = ({...mapViewProps}) => {
  /**
   * Array of all places
   */
  const {places} = usePlaces();

  return (
    <MapView {...mapViewProps}>
      {places?.map(({coordinate, images}, index) => (
        <Marker
          key={index}
          coordinate={{latitude: coordinate.latitude, longitude: coordinate.longitude}}
          onPress={() => console.log('Marker press!')}>
          <PlaceViewMarker size={50} image={images[0]} />
        </Marker>
      ))}
    </MapView>
  );
};

export default PlacesView;
