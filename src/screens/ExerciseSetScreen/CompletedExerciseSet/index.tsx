import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import { Workout } from '@utils/workout';

interface OwnProps
{
  workout: Workout;
  exerciseIndex: number;
  setIndex: number;
}

type Props = OwnProps;

class CompletedExerciseSet extends React.Component<Props>
{
  render()
  {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Complete</Text>
      </View>
    );
  }
}

export default connect<{}, {}, OwnProps, RootState>(
  ( state ) => ( {} ),
  {
  }
)( CompletedExerciseSet );
