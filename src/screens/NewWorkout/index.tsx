import * as React from 'react';
import { View, TouchableNativeFeedback, StyleSheet, Button, Keyboard } from 'react-native';
import { NavigationInjectedProps, NavigationScreenOptions } from 'react-navigation';
import { MKTextField, MKColor } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Workout } from '@utils/workout';

const WHITESPACE_RE = /^[\s]*$/;

type Props = NavigationInjectedProps;

interface State
{
  name: string;
  sets: number;
  reps: number;
  weight: number;
}

export default class NewWorkout extends React.Component<Props, State>
{
  static navigationOptions: NavigationScreenOptions = {
    title: 'New Workout'
  };

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
      <View style={{ flexDirection: 'column', padding: 32 }}>

        <View style={styles.row}>
          <MKTextField
            style={styles.textField}
            placeholder="Workout Name"
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
                <Icon style={styles.icon}
                  name="remove"
                />
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
                <Icon style={styles.icon}
                  name="add"
                />
              </View>
            </TouchableNativeFeedback>
          </View>

          <View style={styles.numberInputContainer}>
            <TouchableNativeFeedback
              background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
              onPress={this.onDecrementReps}
            >
              <View style={styles.iconView}>
                <Icon style={styles.icon}
                  name="remove"
                />
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
                <Icon style={styles.icon}
                  name="add"
                />
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
                <Icon style={styles.icon}
                  name="remove"
                />
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
                <Icon style={styles.icon}
                  name="add"
                />
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>

        <View style={[ styles.row, { marginTop: 8, justifyContent: 'flex-end' } ]}>
          <Button
            title="Create Workout"
            disabled={WHITESPACE_RE.test( this.state.name )
              || this.state.sets === 0
              || this.state.reps === 0
              || this.state.weight === 0}
            onPress={this.onCreateWorkoutPress}
          />
        </View>

      </View>
    );
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

  private onCreateWorkoutPress = () =>
  {
    Keyboard.dismiss();

    let { name, sets, reps, weight } = this.state;

    let workout: Workout = {
      date: new Date(),
      name,
      sets,
      reps,
      weight
    };
    console.log( 'NEW WORKOUT:', workout );
    this.props.navigation.goBack();
  }
}

const styles = StyleSheet.create( {
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
