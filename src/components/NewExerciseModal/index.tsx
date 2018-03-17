import * as React from 'react';
import { View, TouchableNativeFeedback, StyleSheet, Button } from 'react-native';
import Modal from 'react-native-modal';
import { MKColor, MKTextField } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Exercise } from '@utils/workout';

const WHITESPACE_RE = /^[\s]*$/;

interface Props
{
  show: boolean;
  onClose: () => void;
  onAddExercise: ( exercise: Exercise ) => void;
}

interface State
{
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export default class NewExerciseModal extends React.Component<Props, State>
{
  constructor( props: Props )
  {
    super( props );

    this.state = {
      name: '',
      sets: 0,
      reps: 0,
      weight: 0
    };
  }

  render()
  {
    return (
      <View style={styles.modalContainer}>
        <Modal
          isVisible={this.props.show}
          avoidKeyboard={true}
          onBackButtonPress={this.onRequestClose}
          onBackdropPress={this.onRequestClose}
        >
          <View style={styles.modalBackground}>
            <View style={{ flexDirection: 'column', padding: 32 }}>

              <View style={styles.row}>
                <MKTextField
                  style={styles.textField}
                  placeholder="Exercise Name"
                  floatingLabelEnabled={true}
                  autoFocus={true}
                  autoCapitalize="words"
                  returnKeyType="next"
                  value={this.state.name}
                  onChangeText={this.onNameChangeText}
                />
              </View>

              <View style={styles.row}>
                <View style={styles.numberInputContainer}>
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
                    onPress={this.onDecrementSets}
                  >
                    <View style={styles.iconView}>
                      <Icon style={styles.icon} name="remove" />
                    </View>
                  </TouchableNativeFeedback>
                  <MKTextField
                    style={styles.textField}
                    placeholder="Sets"
                    floatingLabelEnabled={true}
                    keyboardType="numeric"
                    returnKeyType="next"
                    selectTextOnFocus={this.state.sets === 0}
                    value={this.state.sets.toString()}
                    onChangeText={this.onSetsChangeText}
                  />
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
                    onPress={this.onIncrementSets}
                  >
                    <View style={styles.iconView}>
                      <Icon style={styles.icon} name="add" />
                    </View>
                  </TouchableNativeFeedback>
                </View>

                <View style={styles.numberInputContainer}>
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
                    onPress={this.onDecrementReps}
                  >
                    <View style={styles.iconView}>
                      <Icon style={styles.icon} name="remove" />
                    </View>
                  </TouchableNativeFeedback>
                  <MKTextField
                    style={styles.textField}
                    placeholder="Reps"
                    floatingLabelEnabled={true}
                    keyboardType="numeric"
                    returnKeyType="next"
                    selectTextOnFocus={this.state.reps === 0}
                    value={this.state.reps.toString()}
                    onChangeText={this.onRepsChangeText}
                  />
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
                    onPress={this.onIncrementReps}
                  >
                    <View style={styles.iconView}>
                      <Icon style={styles.icon} name="add" />
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>

              <View style={[ styles.row, { justifyContent: 'center' } ]}>
                <View style={styles.numberInputContainer}>
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
                    onPress={this.onDecrementWeight}
                  >
                    <View style={styles.iconView}>
                      <Icon style={styles.icon} name="remove" />
                    </View>
                  </TouchableNativeFeedback>
                  <MKTextField
                    style={styles.textField}
                    placeholder="Weight"
                    floatingLabelEnabled={true}
                    keyboardType="numeric"
                    returnKeyType="next"
                    selectTextOnFocus={this.state.weight === 0}
                    value={this.state.weight.toString()}
                    onChangeText={this.onWeightChangeText}
                  />
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
                    onPress={this.onIncrementWeight}
                  >
                    <View style={styles.iconView}>
                      <Icon style={styles.icon} name="add" />
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>

              <View style={[ styles.row, { marginTop: 8, justifyContent: 'flex-end' } ]}>
                <Button
                  title="Add Exercise"
                  disabled={!this.isExerciseValid()}
                  onPress={this.onAddExerciseClick}
                />
              </View>

            </View>
          </View>
        </Modal>
      </View>
    );
  }

  private onRequestClose = () =>
  {
    this.props.onClose();
  }

  private onNameChangeText = ( name: string ) =>
  {
    this.setState( { name: name } );
  }

  private onDecrementSets = () =>
  {
    this.setState( ( { sets } ) => ( { sets: Math.max( 0, sets - 1 ) } ) );
  }

  private onIncrementSets = () =>
  {
    this.setState( ( { sets } ) => ( { sets: sets + 1 } ) );
  }

  private onSetsChangeText = ( setsText: string ) =>
  {
    this.setState( { sets: parseFloat( setsText ) || 0 } );
  }

  private onDecrementReps = () =>
  {
    this.setState( ( { reps } ) => ( { reps: Math.max( 0, reps - 1 ) } ) );
  }

  private onIncrementReps = () =>
  {
    this.setState( ( { reps } ) => ( { reps: reps + 1 } ) );
  }

  private onRepsChangeText = ( repsText: string ) =>
  {
    this.setState( { reps: parseFloat( repsText ) || 0 } );
  }

  private onDecrementWeight = () =>
  {
    this.setState( ( { weight } ) => ( { weight: Math.max( 0, weight - 1 ) } ) );
  }

  private onIncrementWeight = () =>
  {
    this.setState( ( { weight } ) => ( { weight: weight + 1 } ) );
  }

  private onWeightChangeText = ( weightText: string ) =>
  {
    this.setState( { weight: parseFloat( weightText ) || 0 } );
  }

  private isExerciseValid()
  {
    return !(
      WHITESPACE_RE.test( this.state.name )
      || this.state.sets === 0
      || this.state.reps === 0
      || this.state.weight === 0
    );
  }

  private onAddExerciseClick = () =>
  {
    if( this.isExerciseValid() )
    {
      this.props.onAddExercise( {
        name: this.state.name,
        sets: this.state.sets,
        reps: this.state.reps,
        weight: this.state.weight
      } );
    }
  }
}

const styles = StyleSheet.create( {
  modalContainer: {
    flex: 1
  },
  modalBackground: {
    backgroundColor: 'white',
    borderRadius: 4
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  numberInputContainer: {
    flex: 1,
    maxWidth: 150,
    alignItems: 'center',
    marginHorizontal: 8,
    flexDirection: 'row'
  },
  textField: {
    flex: 1,
    height: 48
  },
  iconView: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4
  },
  icon: {
    fontSize: 24,
    color: MKColor.Grey
  }
} );
