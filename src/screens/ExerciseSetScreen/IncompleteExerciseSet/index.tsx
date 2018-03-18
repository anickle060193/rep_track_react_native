import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Button } from 'react-native';

import { markExerciseSetComplete } from '@store/reducers/workouts';
import { navigateToConnectIQ } from '@store/reducers/navigation';

import { Workout } from '@utils/workout';
import ConnectIQ, { IQDevice, REP_TRACK_APP_ID, IQOpenApplicationStatus } from '@utils/connectIQ';

interface PropsFromState
{
  device: IQDevice | null;
}

interface PropsFromDispatch
{
  markExerciseSetComplete: typeof markExerciseSetComplete;
  navigateToConnectIQ: typeof navigateToConnectIQ;
}

interface OwnProps
{
  workout: Workout;
  exerciseIndex: number;
  setIndex: number;
}

type Props = PropsFromState & PropsFromDispatch & OwnProps;

class IncompleteExerciseSet extends React.Component<Props>
{
  render()
  {
    return (
      <View style={styles.column}>
        <View style={styles.column}>
          <Text>Incomplete</Text>

          {this.props.device ? (
            <React.Fragment>
              <Button
                title="Open Connect IQ App"
                onPress={this.onOpenConnectIQAppPress}
              />
              <Button
                title="Send Message"
                onPress={this.onSendMessagePress}
              />
            </React.Fragment>
          ) :
            (
              <Button
                title="Connect IQ"
                onPress={this.onConnectIQPress}
              />
            )}

        </View>

        <View style={styles.markSetCompletedButton}>
          <Button
            title="Mark Set Completed"
            onPress={this.onMarkSetCompletedPress}
          />
        </View>
      </View>
    );
  }

  private onOpenConnectIQAppPress = async () =>
  {
    if( this.props.device )
    {
      let appInfo = await ConnectIQ.getApplicationInfo( this.props.device.id, REP_TRACK_APP_ID );
      if( typeof appInfo === 'string' )
      {
        console.log( 'Not Installed:', appInfo );
      }
      else
      {
        console.log( 'APP INFO:', appInfo );
        let res = await ConnectIQ.openApplication( this.props.device.id, REP_TRACK_APP_ID );
        console.log( 'APP OPEN:', IQOpenApplicationStatus[ res ] );
      }
    }
  }

  private onConnectIQPress = () =>
  {
    this.props.navigateToConnectIQ();
  }

  private onSendMessagePress = async () =>
  {
    if( this.props.device )
    {
      ConnectIQ.sendMessage( this.props.device.id, REP_TRACK_APP_ID, 'Hello Message' );
    }
  }

  private onMarkSetCompletedPress = () =>
  {
    this.props.markExerciseSetComplete( {
      workoutId: this.props.workout.id,
      exerciseIndex: this.props.exerciseIndex,
      setIndex: this.props.setIndex
    } );
  }
}

const styles = StyleSheet.create( {
  column: {
    flex: 1,
    flexDirection: 'column'
  },
  markSetCompletedButton: {
    flexDirection: 'column',
    margin: 16
  }
} );

export default connect<PropsFromState, PropsFromDispatch, OwnProps, RootState>(
  ( state ) => ( {
    device: state.connectIQ.device
  } ),
  {
    markExerciseSetComplete,
    navigateToConnectIQ
  }
)( IncompleteExerciseSet );
