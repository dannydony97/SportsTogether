import React, {FC, useRef} from 'react';
import {PlaceViewProps} from '../types';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {View, Text, Image} from 'react-native-ui-lib';
import {ImageViewer, ImageWrapper} from 'react-native-reanimated-viewer';
import {FlatList} from 'react-native-gesture-handler';
import {ListRenderItemInfo} from 'react-native';

const ICON_IMAGE_SIZE = 70;

const PlaceView: FC<PlaceViewProps> = ({placeData}) => {
  /**
   * Image viewer reference object instance
   */
  const imageViewerRef = useRef(null);

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
        <FlatList showsHorizontalScrollIndicator={false} horizontal data={placeData?.images} renderItem={renderImage} />
      </View>
    </BottomSheetScrollView>
  );
};

export default PlaceView;
