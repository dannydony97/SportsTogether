import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {PlacesBottomSheetProps} from '../types';
import {BottomSheetMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import BottomSheet from '@gorhom/bottom-sheet';
import {useAnimatedReaction, useSharedValue} from 'react-native-reanimated';
import PlaceView from './PlaceView';
import HomeView from './HomeView';

const PlacesBottomSheet: FC<PlacesBottomSheetProps> = ({placeData, translateY, ...bottomSheetModalProps}) => {
  /**
   * Bottom sheet reference object instance
   */
  const bottomSheetRef = useRef<BottomSheetMethods>(null);

  /**
   * Snap points
   */
  const snapPoints = useMemo(() => [100, 300, 500], []);

  /**
   * Bottom sheet vertical position
   */
  const animatedPosition = useSharedValue(0);

  /**
   * Bottom sheet current index
   */
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (placeData) {
      setIndex(1);
    } else {
      setIndex(0);
    }
  }, [placeData]);

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
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      animatedPosition={animatedPosition}
      index={index}
      {...bottomSheetModalProps}>
      {placeData ? <PlaceView placeData={placeData} /> : <HomeView />}
    </BottomSheet>
  );
};

export default PlacesBottomSheet;
