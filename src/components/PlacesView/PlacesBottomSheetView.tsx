import React, {FC, useEffect, useMemo, useRef} from 'react';
import {PlacesBottomSheetViewProps} from './types';
import {Text, View} from 'react-native-ui-lib';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';

const PlacesBottomSheetView: FC<PlacesBottomSheetViewProps> = ({placeData}) => {
  /**
   * Bottom sheet reference object instance
   */
  const bottomSheetRef = useRef<BottomSheetModalMethods>(null);

  /**
   * Snap points
   */
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  useEffect(() => {
    if (placeData) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [placeData]);

  return (
    <BottomSheetModal enablePanDownToClose={false} ref={bottomSheetRef} snapPoints={snapPoints} index={1}>
      <View>
        <Text>Awesome 🎉</Text>
      </View>
    </BottomSheetModal>
  );
};

export default PlacesBottomSheetView;
