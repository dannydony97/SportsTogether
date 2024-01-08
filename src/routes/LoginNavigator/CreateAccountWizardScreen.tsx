import React, {FC, useState} from 'react';
import Screen from '../../components/Screen';
import {Button, Chip, Colors, GridList, Text, TextField, View, Wizard, WizardStepStates} from 'react-native-ui-lib';
import {Ionicon, MaterialIcon} from '../../components/Icon';
import {Sport, UserProps} from '../../api/datamodel/types';
import {ColorValue, ListRenderItemInfo} from 'react-native';
import {useUser} from '../../providers/UserProvider';
import {LoginNavigatorScreenProps} from './types';
import ProfilePicture from '../../components/ProfilePicture';

interface ComponentProps {
  userProps: UserProps;
  updateUserProps: (value: Partial<UserProps>) => void;
}

type WizardStep = {
  state: WizardStepStates;
  label: string;
  Component: FC<ComponentProps>;
};

/**
 * List of wizard steps
 */
const WIZARD_STEPS: WizardStep[] = [
  {
    state: WizardStepStates.ENABLED,
    label: 'Who are you?',
    Component: ({userProps, updateUserProps}) => (
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
    label: 'How do you look?',
    Component: ({userProps, updateUserProps}) => {
      return (
        <View flex>
          <Text text30R style={{marginVertical: 20}}>
            Upload a picture of yourself for your profile
          </Text>
          <ProfilePicture selectPhotoButton containerStyle={{alignSelf: 'center'}} size={200} />
        </View>
      );
    },
  },
  {
    state: WizardStepStates.ENABLED,
    label: 'Preferred sports',
    Component: ({userProps, updateUserProps}) => {
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
    Component: () => (
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

const CreateAccountWizardScreen: FC<LoginNavigatorScreenProps<'CreateAccountWizard'>> = () => {
  /**
   * Creates the authentificated user function
   */
  const {createUser} = useUser();

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
      case 2:
        return userProps.preferredSports.length === 0;
    }

    return false;
  };

  /**
   * Triggered when all user properties has been collected
   */
  const onCreateAccountCompleted = async (): Promise<void> => {
    await createUser(userProps);
  };

  /**
   * Triggered when the next buttom has been pressed
   */
  const onNextButtonPress = (): void => {
    const nextIndex = activeIndex + 1;
    if (nextIndex < WIZARD_STEPS.length) {
      setActiveIndex(nextIndex);
    } else {
      onCreateAccountCompleted();
    }
  };

  return (
    <Screen>
      <Wizard activeIndex={activeIndex}>
        {WIZARD_STEPS.map(({state, label}, index) => (
          <Wizard.Step key={index} state={state} label={label} />
        ))}
      </Wizard>
      <View flex style={{padding: 15}}>
        {WIZARD_STEPS[activeIndex].Component({
          userProps,
          updateUserProps,
        })}
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
            onPress={onNextButtonPress}
          />
        </View>
      </View>
    </Screen>
  );
};

export default CreateAccountWizardScreen;
