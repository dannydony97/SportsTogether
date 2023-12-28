import {SharedValue} from 'react-native-reanimated';
import {PlaceData} from '../../api/datamodel/types';
import {BottomSheetModalProps} from '@gorhom/bottom-sheet';

export interface PlacesViewProps {}

export interface PlaceViewMarkerProps {
  image: string;
  selected: boolean;
}

export interface PlacesBottomSheetViewProps extends Omit<BottomSheetModalProps, 'children'> {
  translateY?: SharedValue<number>;
  placeData?: PlaceData;
}
