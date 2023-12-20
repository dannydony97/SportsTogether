import React, {FC, useState} from 'react';
import Screen from '../../components/Screen';
import {Button, Chip, Colors, GridList, Text, TextField, View, Wizard, WizardStepStates} from 'react-native-ui-lib';
import {HomeNavigatorScreenProps} from './types';
import {Ionicon, MaterialIcon} from '../../components/Icon';
import {Sport, UserProps} from '../../api/datamodel/types';
import {ColorValue, ListRenderItemInfo} from 'react-native';

type WizardStep = {
  state: WizardStepStates;
  label: string;
  component: (userProps: UserProps, updateUserProps: (value: Partial<UserProps>) => void) => JSX.Element;
};

/**
 * List of wizard steps
 */
const WIZARD_STEPS: WizardStep[] = [
  {
    state: WizardStepStates.ENABLED,
    label: 'Who are you',
    component: (userProps, updateUserProps) => (
      <View flex>
        <Text text30R style={{marginVertical: 20}}>
          What's your name?
        </Text>
        <TextField
          value={userProps.displayName ?? ''}
          onChangeText={text => updateUserProps({displayName: text})}
          placeholder="Name"
          floatingPlaceholder
          text50T
        />
      </View>
    ),
  },
  {
    state: WizardStepStates.ENABLED,
    label: 'Preferred sports',
    component: (userProps, updateUserProps) => {
      /**
       * Renders an item of the preferred sports list
       */
      const renderPreferredSportsListItem = (info: ListRenderItemInfo<SportItem>): JSX.Element => {
        /**
         * Tells if this item sport name is selected or not
         */
        const selected =
          userProps.preferredSports.find(preferredSport => preferredSport === info.item.name) !== undefined;

        const onListItemPress = (): void => {
          if (!selected) {
            updateUserProps({preferredSports: [...userProps.preferredSports, info.item.name]});
          } else {
            updateUserProps({
              preferredSports: [
                ...userProps.preferredSports.filter(preferredSport => preferredSport !== info.item.name),
              ],
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
    },
  },
  {
    state: WizardStepStates.COMPLETED,
    label: 'Complete',
    component: () => (
      <View flex style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text text10>That's it!</Text>
      </View>
    ),
  },
];

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

const CreateAccountWizardScreen: FC<HomeNavigatorScreenProps<'CreateAccountWizard'>> = () => {
  /**
   * Index of the active step
   */
  const [activeIndex, setActiveIndex] = useState(0);

  /**
   * Collected user's properties
   */
  const [userProps, setUserProps] = useState<UserProps>({
    displayName: '',
    preferredSports: [],
  });

  /**
   * Updates the user's properties
   * @param value Some user's properties
   */
  const updateUserProps = (value: Partial<UserProps>): void => {
    setUserProps({
      ...userProps,
      ...value,
    });
  };

  /**
   * Tells if the 'next' button is disabled or not depending on the current step
   */
  const isDisabledNextButton = (): boolean => {
    switch (activeIndex) {
      case 0:
        return userProps.displayName?.length === 0;
      case 1:
        return userProps.preferredSports.length === 0;
    }

    return false;
  };

  return (
    <Screen>
      <Wizard activeIndex={activeIndex}>
        {WIZARD_STEPS.map(({state, label}) => (
          <Wizard.Step state={state} label={label} />
        ))}
      </Wizard>
      <View flex style={{padding: 15}}>
        {WIZARD_STEPS[activeIndex].component(userProps, updateUserProps)}
        <View style={{justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row'}}>
          {WIZARD_STEPS[activeIndex].state !== WizardStepStates.COMPLETED && (
            <View flex style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcon name="info" size={30} />
              <Text>You can change this later in settings.</Text>
            </View>
          )}
          <Button
            style={{padding: 13}}
            iconSource={() => <MaterialIcon name="arrow-forward-ios" size={30} color="white" />}
            enableShadow
            disabled={isDisabledNextButton()}
            onPress={() => setActiveIndex(activeIndex + 1)}
          />
        </View>
      </View>
    </Screen>
  );
};

export default CreateAccountWizardScreen;
