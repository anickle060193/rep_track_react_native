import * as React from 'react';
import { View, TouchableNativeFeedback, StyleSheet, Button } from 'react-native';
import Modal from 'react-native-modal';
import { MKColor, MKTextField } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Exercise, createNewExercise } from '@utils/workout';

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
  setCount: number;
  repCount: number;
  weight: number;
}

export default class NewExerciseModal extends React.Component<Props, State>
{
  constructor( props: Props )
  {
    super( props );

    this.state = {
      name: '',
      setCount: 0,
      repCount: 0,
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
                    onPress={this.onDecrementSetCount}
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
                    selectTextOnFocus={this.state.setCount === 0}
                    value={this.state.setCount.toString()}
                    onChangeText={this.onSetCountChangeText}
                  />
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
                    onPress={this.onIncrementSetCount}
                  >
                    <View style={styles.iconView}>
                      <Icon style={styles.icon} name="add" />
                    </View>
                  </TouchableNativeFeedback>
                </View>

                <View style={styles.numberInputContainer}>
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
                    onPress={this.onDecrementRepCount}
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
                    selectTextOnFocus={this.state.repCount === 0}
                    value={this.state.repCount.toString()}
                    onChangeText={this.onRepCountChangeText}
                  />
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
                    onPress={this.onIncrementRepCount}
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

  private onDecrementSetCount = () =>
  {
    this.setState( ( { setCount } ) => ( { setCount: Math.max( 0, setCount - 1 ) } ) );
  }

  private onIncrementSetCount = () =>
  {
    this.setState( ( { setCount } ) => ( { setCount: setCount + 1 } ) );
  }

  private onSetCountChangeText = ( setCountText: string ) =>
  {
    this.setState( { setCount: parseFloat( setCountText ) || 0 } );
  }

  private onDecrementRepCount = () =>
  {
    this.setState( ( { repCount } ) => ( { repCount: Math.max( 0, repCount - 1 ) } ) );
  }

  private onIncrementRepCount = () =>
  {
    this.setState( ( { repCount } ) => ( { repCount: repCount + 1 } ) );
  }

  private onRepCountChangeText = ( repCountText: string ) =>
  {
    this.setState( { repCount: parseFloat( repCountText ) || 0 } );
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
      || this.state.setCount === 0
      || this.state.repCount === 0
      || this.state.weight === 0
    );
  }

  private onAddExerciseClick = () =>
  {
    if( this.isExerciseValid() )
    {
      this.props.onAddExercise( createNewExercise( this.state.name, this.state.setCount, this.state.repCount, this.state.weight ) );
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
