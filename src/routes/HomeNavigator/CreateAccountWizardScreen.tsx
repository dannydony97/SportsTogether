import React, {FC, useState} from 'react';
import Screen from '../../components/Screen';
import {Button, Text, TextField, View, Wizard, WizardStepStates} from 'react-native-ui-lib';
import {HomeNavigatorScreenProps} from './types';
import {MaterialIcon} from '../../components/Icon';

const CreateAccountWizardScreen: FC<HomeNavigatorScreenProps<'CreateAccountWizard'>> = () => {
  /**
   * Index of the active step
   */
  const [activeIndex, setActiveIndex] = useState(0);

  /**
   * Tells if the 'next' button is disabled or not
   */
  const [disabledNextButton, setDisabledNextButton] = useState(true);

  /**
   * Renders the name view
   */
  const renderName = (): JSX.Element => {
    return (
      <View flex>
        <Text text30R style={{marginVertical: 20}}>
          What's your name?
        </Text>
        <TextField placeholder="Name" floatingPlaceholder text50T />
      </View>
    );
  };

  /**
   * Renders the preferred sports view
   */
  const renderPreferredSports = (): JSX.Element => {
    return (
      <View flex>
        <Text>I'm here</Text>
      </View>
    );
  };

  /**
   * Renders the completed view
   */
  const renderCompleted = (): JSX.Element => {
    return <View />;
  };

  const renderCurrentStep = (): JSX.Element => {
    switch (activeIndex) {
      case 0:
        return renderName();
      case 1:
        return renderPreferredSports();
      case 2:
        return renderCompleted();
      default:
        throw new Error(`Step ${activeIndex} has no render function`);
    }
  };

  return (
    <Screen>
      <Wizard activeIndex={activeIndex}>
        <Wizard.Step state={WizardStepStates.ENABLED} label={'Who are you'} />
        <Wizard.Step state={WizardStepStates.ENABLED} label={'Preferred sports'} />
        <Wizard.Step state={WizardStepStates.COMPLETED} label={'Complete'} />
      </Wizard>
      <View flex style={{padding: 15}}>
        {renderCurrentStep()}
        <View style={{justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row'}}>
          <View flex style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcon name="info" size={30} />
            <Text>You can change this later in settings.</Text>
          </View>
          <Button
            style={{padding: 13}}
            iconSource={() => <MaterialIcon name="arrow-forward-ios" size={30} color="white" />}
            enableShadow
            disabled={disabledNextButton}
          />
        </View>
      </View>
    </Screen>
  );
};

export default CreateAccountWizardScreen;
