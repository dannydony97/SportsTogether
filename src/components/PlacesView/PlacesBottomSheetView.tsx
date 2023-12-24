import React, {FC, useEffect, useMemo, useRef} from 'react';
import {PlacesBottomSheetViewProps} from './types';
import {Image, Text, View} from 'react-native-ui-lib';
import {BottomSheetModal, BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import {FlatList} from 'react-native-gesture-handler';
import {ImageViewer, ImageWrapper} from 'react-native-reanimated-viewer';
import {ListRenderItemInfo} from 'react-native';

const ICON_IMAGE_SIZE = 70;

const PlacesBottomSheetView: FC<PlacesBottomSheetViewProps> = ({placeData}) => {
  /**
   * Bottom sheet reference object instance
   */
  const bottomSheetRef = useRef<BottomSheetModalMethods>(null);

  /**
   * Image viewer reference object instance
   */
  const imageViewerRef = useRef(null);

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
  const renderImage = (info: ListRenderItemInfo<string>): JSX.Element => {
    return (
      <ImageWrapper style={{margin: 10}} viewerRef={imageViewerRef} index={info.index} source={{uri: info.item}}>
        <Image source={{uri: info.item}} style={{borderRadius: 10, aspectRatio: 2 / 3, width: 200}} />
      </ImageWrapper>
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
        <ImageViewer
          ref={imageViewerRef}
          data={(placeData?.images ?? []).map(image => ({key: `key-${image}`, source: {uri: image}}))}
        />
        <View style={{flexDirection: 'row'}}>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={placeData?.images}
            renderItem={renderImage}
          />
          {/* {(placeData?.images ?? []).map((image, index) => (
            <ImageWrapper viewerRef={imageViewerRef} index={index} source={{uri: image}}>
              <Image source={{uri: image}} style={{aspectRatio: 2 / 3, width: 200}} />
            </ImageWrapper>
          ))} */}
        </View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};

export default PlacesBottomSheetView;
