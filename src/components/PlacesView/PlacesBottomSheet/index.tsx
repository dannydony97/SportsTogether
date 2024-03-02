import React, {forwardRef, useMemo} from 'react';
import {PlacesBottomSheetProps} from '../types';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {useAnimatedReaction, useSharedValue} from 'react-native-reanimated';
import PlaceView from './PlaceView';
import MainView from './MainView';

const PlacesBottomSheet = forwardRef<BottomSheetMethods, PlacesBottomSheetProps>(
  ({placeData, translateY, ...bottomSheetModalProps}, ref) => {
    /**
     * Snap points
     */
    const snapPoints = useMemo(() => [100, '50%'], []);

    /**
     * Bottom sheet vertical position
     */
    const animatedPosition = useSharedValue(0);

    /**
     * Hook for calculating vertical translation
     */
    useAnimatedReaction(
      () => {
        return animatedPosition.value;
      },
      (prepared, previous) => {
        if (!translateY || !previous) {
          return;
        }
        translateY.value += prepared - previous;
      },
    );

    return (
      <BottomSheet
        enablePanDownToClose={false}
        ref={ref}
        snapPoints={snapPoints}
        animatedPosition={animatedPosition}
        keyboardBehavior="fillParent"
        {...bottomSheetModalProps}>
        <BottomSheetScrollView>{placeData ? <PlaceView placeData={placeData} /> : <MainView />}</BottomSheetScrollView>
      </BottomSheet>
    );
  },
);

export default PlacesBottomSheet;
