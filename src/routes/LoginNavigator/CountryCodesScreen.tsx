import React, {FC, useEffect, useLayoutEffect, useState} from 'react';
import {LoginNavigatorScreenProps} from './types';
import {CountryData, all} from 'country-codes-list';
import Screen from '../../components/Screen';
import {ScrollView, StyleSheet} from 'react-native';
import {Colors, ListItem, Text} from 'react-native-ui-lib';

const CountryCodesScreen: FC<LoginNavigatorScreenProps<'CountryCodes'>> = ({navigation}) => {
  /**
   * Search query value
   */
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Filtered data
   */
  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>(all());

  /**
   * Setting navigation options
   */
  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        autoFocus: true,
        onChangeText(e) {
          setSearchQuery(e.nativeEvent.text);
        },
        onCancelButtonPress: () => navigation.goBack(),
      },
    });
  }, [navigation]);

  /**
   * Triggered when the {@link searchQuery} has been changed in order to filter the countries
   */
  useEffect(() => {
    const filtered = all().filter(
      country => country.countryNameEn.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1,
    );
    setFilteredCountries(filtered);
  }, [searchQuery]);

  /**
   * Triggered when a country item has been selected
   * @param country selected country data
   */
  const onCountryPress = (country: CountryData): void => {
    navigation.navigate('MobileNumber', {
      countryCallingCode: formatCallingCode(country.countryCallingCode),
    });
  };

  /**
   * Formats the country calling code by adding a '+' sign in front of it
   * @param countryCallingCode calling code of a country
   * @returns formatted calling code of a country
   */
  const formatCallingCode = (countryCallingCode: string): string => {
    return `+${countryCallingCode}`;
  };

  return (
    <Screen>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {filteredCountries.map((country, index) => (
          <ListItem key={index} height={50} onPress={() => onCountryPress(country)}>
            <ListItem.Part middle containerStyle={styles.listItem}>
              <Text text70 style={{flex: 1, marginRight: 10}} numberOfLines={1}>
                {`${country.flag} ${country.countryNameEn}`}
              </Text>
              <Text grey30 text70 style={{marginTop: 2}}>
                {formatCallingCode(country.countryCallingCode)}
              </Text>
            </ListItem.Part>
          </ListItem>
        ))}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grey60,
    paddingHorizontal: 17,
  },
});

export default CountryCodesScreen;
