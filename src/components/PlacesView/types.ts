import {MapViewProps} from 'react-native-maps';

export interface PlacesViewProps extends MapViewProps {}

export interface PlaceViewMarkerProps {
  size: number;
  image: string;
}
