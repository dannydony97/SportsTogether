import React, {FC} from 'react';
import {WizardComponentProps} from '.';
import {Chip, Colors, GridList, Text, View} from 'react-native-ui-lib';
import {Ionicon, MaterialIcon} from '../../../components/Icon';
import {ColorValue, ListRenderItemInfo} from 'react-native';
import {Sport} from '../../../api/datamodel/types';

type SportItem = {
  name: Sport;
  icon: (color: ColorValue) => JSX.Element;
};

const SPORTS: ReadonlyArray<SportItem> = [
  {
    name: 'Calisthenics',
    icon: (color: ColorValue) => <MaterialIcon name="sports-gymnastics" size={20} color={color} />,
  },
  {
    name: 'Football',
    icon: (color: ColorValue) => <Ionicon name="football" size={20} color={color} />,
  },
];

const GetPreferredSports: FC<WizardComponentProps> = ({userProps, updateUserProps}) => {
  /**
   * Renders an item of the preferred sports list
   */
  const renderPreferredSportsListItem = (info: ListRenderItemInfo<SportItem>): JSX.Element => {
    /**
     * Tells if this item sport name is selected or not
     */
    const selected = userProps.preferredSports.find(preferredSport => preferredSport === info.item.name) !== undefined;

    const onListItemPress = (): void => {
      if (!selected) {
        updateUserProps({preferredSports: [...userProps.preferredSports, info.item.name]});
      } else {
        updateUserProps({
          preferredSports: [...userProps.preferredSports.filter(preferredSport => preferredSport !== info.item.name)],
        });
      }
    };

    return (
      <Chip
        label={info.item.name}
        leftElement={info.item.icon(selected ? Colors.$iconPrimary : Colors.$textDefault)}
        onPress={onListItemPress}
        labelStyle={{color: selected ? Colors.$iconPrimary : Colors.$textDefault}}
        containerStyle={{
          borderColor: selected ? Colors.$iconPrimary : Colors.$textDefault,
        }}
      />
    );
  };

  return (
    <View flex>
      <Text text30R style={{marginVertical: 20}}>
        What are your preferred sports?
      </Text>
      <GridList data={SPORTS} renderItem={renderPreferredSportsListItem} scrollEnabled={false} />
    </View>
  );
};

export default GetPreferredSports;
