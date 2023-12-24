import React, {FC, useEffect, useMemo, useRef} from 'react';
import {PlacesBottomSheetViewProps} from './types';
import {Image, Text, View} from 'react-native-ui-lib';
import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {FlatList} from 'react-native-gesture-handler';

const ICON_IMAGE_SIZE = 70;

const PlacesBottomSheetView: FC<PlacesBottomSheetViewProps> = ({placeData}) => {
  /**
   * Bottom sheet reference object instance
   */
  const bottomSheetRef = useRef<BottomSheetModalMethods>(null);

  /**
   * Snap points
   */
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  useEffect(() => {
    if (placeData) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.dismiss();
    }
  }, [placeData]);

  /**
   * Renders images from the flat list
   * @param image image uri
   */
  const renderImage = (image: string): JSX.Element => {
    return (
      <View style={{padding: 10}}>
        <Image source={{uri: image}} style={{width: 200, aspectRatio: 2 / 3, borderRadius: 10}} />
      </View>
    );
  };

  return (
    <BottomSheetModal enablePanDownToClose={false} ref={bottomSheetRef} snapPoints={snapPoints} index={1}>
      <BottomSheetScrollView>
        <View flex style={{flexDirection: 'row', paddingHorizontal: 10, marginBottom: 10}}>
          <Image
            style={{
              width: ICON_IMAGE_SIZE,
              height: ICON_IMAGE_SIZE,
              borderRadius: ICON_IMAGE_SIZE / 2,
              marginRight: 10,
            }}
            source={{uri: placeData?.images[0]}}
          />
          <View>
            <Text text50BO>{placeData?.name}</Text>
            <Text text80>{placeData?.sport}</Text>
          </View>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={placeData?.images ?? []}
          renderItem={info => renderImage(info.item)}
        />
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default PlacesBottomSheetView;
