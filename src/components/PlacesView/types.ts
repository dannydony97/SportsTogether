import {SharedValue} from 'react-native-reanimated';
import {PlaceData} from '../../api/datamodel/types';
import {BottomSheetModalProps} from '@gorhom/bottom-sheet';
import {Dispatch} from 'react';

export interface PlacesViewProps {}

export interface PlaceMarkerProps {
  image: string;
  selected: boolean;
}

export interface CurrentPositionMarkerProps {}

export interface PlacesBottomSheetProps extends Omit<BottomSheetModalProps, 'children'> {
  translateY?: SharedValue<number>;
  placeData?: PlaceData;
}

export interface MainViewProps {
  searchVisible?: boolean;
  seatSearchVisible?: Dispatch<boolean>;
}

export interface PlaceViewProps {
  placeData: PlaceData;
}
