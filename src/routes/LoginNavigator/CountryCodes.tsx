import React, {FC, useEffect, useState} from 'react';
import {LoginNavigatorScreenProps} from './types';
import {CountryData, all} from 'country-codes-list';
import {Button, List, Searchbar, Text} from 'react-native-paper';
import Screen from '../../components/Screen';
import {ScrollView} from 'react-native';

const CountryCodes: FC<LoginNavigatorScreenProps<'CountryCodes'>> = ({navigation}) => {
  /**
   * Search query value
   */
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Filtered data
   */
  const [filteredCountries, setFilteredCountries] = useState<CountryData[]>(all());

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
   * Triggered when the 'Cancel' button has been pressed
   */
  const onCancelPress = () => {
    navigation.goBack();
  };

  /**
   * Triggered when a country item has been selected
   * @param country selected country data
   */
  const onCountryPress = (country: CountryData) => {
    navigation.navigate('MobileNumber', {
      countryCallingCode: formatCallingCode(country.countryCallingCode),
    });
  };

  /**
   * Formats the country calling code by adding a '+' sign in front of it
   * @param countryCallingCode calling code of a country
   * @returns formatted calling code of a country
   */
  const formatCallingCode = (countryCallingCode: string) => {
    return `+${countryCallingCode}`;
  };

  return (
    <Screen safeArea>
      <Searchbar
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        right={() => <Button onPress={onCancelPress}>Cancel</Button>}
      />

      <ScrollView>
        <List.Section>
          {filteredCountries.map((country, index) => (
            <List.Item
              key={index}
              title={country.countryNameEn}
              onPress={() => onCountryPress(country)}
              left={() => <Text>{country.flag}</Text>}
              right={() => <Text>{formatCallingCode(country.countryCallingCode)}</Text>}
            />
          ))}
        </List.Section>
      </ScrollView>
    </Screen>
  );
};

export default CountryCodes;
