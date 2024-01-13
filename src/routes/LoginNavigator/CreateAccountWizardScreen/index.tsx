import React, {FC, useState} from 'react';
import Screen from '../../../components/Screen';
import {Button, Text, View, Wizard, WizardStepStates} from 'react-native-ui-lib';
import {MaterialIcon} from '../../../components/Icon';
import {UserProps} from '../../../api/datamodel/types';
import {useUser} from '../../../providers/UserProvider';
import {LoginNavigatorScreenProps} from '../types';
import UploadProfilePicture from './UploadProfilePicture';
import GetName from './GetName';
import GetPreferredSports from './GetPreferredSports';

export interface WizardComponentProps {
  userProps: UserProps;
  updateUserProps: (value: Partial<UserProps>) => void;
}

type WizardStep = {
  state: WizardStepStates;
  label: string;
  Component: FC<WizardComponentProps>;
};

/**
 * List of wizard steps
 */
const WIZARD_STEPS: WizardStep[] = [
  {
    state: WizardStepStates.ENABLED,
    label: 'Who are you?',
    Component: props => <GetName {...props} />,
  },
  {
    state: WizardStepStates.ENABLED,
    label: 'How do you look?',
    Component: props => <UploadProfilePicture {...props} />,
  },
  {
    state: WizardStepStates.ENABLED,
    label: 'Preferred sports',
    Component: props => <GetPreferredSports {...props} />,
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

const CreateAccountWizardScreen: FC<LoginNavigatorScreenProps<'CreateAccountWizard'>> = () => {
  /**
   * Creates the authentificated user function
   */
  const {createUser, uploadProfilePicture} = useUser();

  /**
   * Index of the active step
   */
  const [activeIndex, setActiveIndex] = useState(0);

  /**
   * Collected user's properties
   */
  const [userProps, setUserProps] = useState<UserProps>({
    displayName: '',
    photoURL: null,
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
    const {photoURL: profilePicturePath} = userProps;
    if (profilePicturePath) {
      const photoURL = await uploadProfilePicture(profilePicturePath);
      await createUser({
        ...userProps,
        photoURL,
      });
    } else {
      createUser(userProps);
    }
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
