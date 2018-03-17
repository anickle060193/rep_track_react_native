import * as React from 'react';
import { BackHandler } from 'react-native';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import { createReactNavigationReduxMiddleware, createReduxBoundAddListener } from 'react-navigation-redux-helpers';

import Workouts from '@screens/Workouts';
import WorkoutScreen from '@screens/WorkoutScreen';
import ExerciseScreen from '@screens/ExerciseScreen';

import { State as NavigationState, navigateBack } from '@store/reducers/navigation';

import { Routes } from '@utils/routes';

export const navigationMiddleware = createReactNavigationReduxMiddleware<RootState>( 'root', ( state ) => state.navigation );
const addListener = createReduxBoundAddListener( 'root' );

export const AppNavigator = StackNavigator(
  {
    [ Routes.Workouts ]: { screen: Workouts },
    [ Routes.Workout ]: { screen: WorkoutScreen },
    [ Routes.Exercise ]: { screen: ExerciseScreen }
  },
  {
    initialRouteName: Routes.Workouts,

    navigationOptions: {
      title: 'Rep Tracker' + ( __DEV__ ? ` ${new Date().toTimeString()}` : '' ),
      headerStyle: {
        backgroundColor: '#FF5722'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
);

interface PropsFromState
{
  navigation: NavigationState;
}

interface PropsFromDispatch
{
  dispatch: Dispatch<RootState>;
  navigateBack: typeof navigateBack;
}

type Props = PropsFromState & PropsFromDispatch;

class AppNav extends React.Component<Props>
{
  componentDidMount()
  {
    BackHandler.addEventListener( 'hardwareBackPress', this.onBack );
  }

  componentWillUnmount()
  {
    BackHandler.removeEventListener( 'hardwareBackPress', this.onBack );
  }

  render()
  {
    return (
      <AppNavigator
        navigation={addNavigationHelpers( {
          dispatch: this.props.dispatch,
          state: this.props.navigation,
          addListener
        } )}
      />
    );
  }

  private onBack = () =>
  {
    if( this.props.navigation.index === 0 )
    {
      return false;
    }
    else
    {
      this.props.navigateBack();
      return true;
    }
  }
}

export default connect<PropsFromState, PropsFromDispatch, {}, RootState>(
  ( state ) => ( {
    navigation: state.navigation
  } ),
  ( dispatch ) => ( {
    dispatch,
    navigateBack: bindActionCreators( navigateBack, dispatch )
  } )
)( AppNav );
