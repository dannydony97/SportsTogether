import {ViewProps} from 'react-native-ui-lib';
import {PlaceData} from '../../api/datamodel/types';

export interface PlacesViewProps extends ViewProps {}

export interface PlaceViewMarkerProps {
  image: string;
  selected: boolean;
}

export interface PlacesBottomSheetViewProps {
  placeData?: PlaceData;
}
