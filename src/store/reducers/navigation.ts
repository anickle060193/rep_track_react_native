import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { NavigationActions } from 'react-navigation';

import { Routes, isWorkoutRoute, isExerciseRoute, RouteLeaf, isExerciseSetRoute } from '@utils/routes';
import { Workout } from '@utils/workout';

export interface State
{
  index: number;
  routes: RouteLeaf[];
}

const initialState: State = {
  index: 0,
  routes: [ { key: Routes.Workouts, routeName: Routes.Workouts, params: { route: Routes.Workouts } } ]
};

const actionCreator = actionCreatorFactory();

export const navigateBack = actionCreator( NavigationActions.BACK );
export const navigateToWorkout = actionCreator<Workout>( 'NAVIGATE_TO_WORKOUT' );
export const setWorkoutEditing = actionCreator<boolean>( 'SET_WORKOUT_EDITING' );
export const navigateToExercise = actionCreator<{ workout: Workout, exerciseIndex: number }>( 'NAVIGATE_TO_EXERCISE' );
export const navigateToExerciseSet = actionCreator<{ workout: Workout, exerciseIndex: number, setIndex: number }>( 'NAVIGATE_TO_EXERCISE_SET' );
export const navigateToConnectIQ = actionCreator( 'NAVIGATE_TO_CONNECT_IQ' );

const getCurrentRoute = ( state: State ) => state.routes[ state.index ];

const addRoute = ( state: State, route: RouteLeaf ): State => ( {
  ...state,
  index: state.index + 1,
  routes: [
    ...state.routes,
    route
  ]
} );

export const reducer = reducerWithInitialState<State>( initialState )
  .case( navigateToWorkout, ( state, workout ) =>
  {
    let currentRoute = getCurrentRoute( state );
    if( isWorkoutRoute( currentRoute )
      && currentRoute.params.workout.id === workout.id )
    {
      return state;
    }
    else
    {
      return addRoute( state, {
        key: `workout:${workout.id}`,
        routeName: Routes.Workout,
        params: { workout: workout, editing: false }
      } );
    }
  } )
  .case( setWorkoutEditing, ( state, editing ) =>
  {
    let currentRoute = getCurrentRoute( state );
    if( isWorkoutRoute( currentRoute ) )
    {
      let routes = [ ...state.routes ];
      routes[ state.index ] = {
        ...currentRoute,
        params: {
          ...currentRoute.params,
          editing
        }
      };
      return {
        ...state,
        routes
      };
    }
    else
    {
      return state;
    }
  } )
  .case( navigateToExercise, ( state, { workout, exerciseIndex } ) =>
  {
    let currentRoute = getCurrentRoute( state );
    if( isExerciseRoute( currentRoute )
      && currentRoute.params.workout.id === workout.id
      && currentRoute.params.exerciseIndex === exerciseIndex )
    {
      return state;
    }
    else
    {
      return addRoute( state, {
        key: `workout:${workout.id}_exercise:${exerciseIndex}`,
        routeName: Routes.Exercise,
        params: {
          workout,
          exerciseIndex
        }
      } );
    }
  } )
  .case( navigateToExerciseSet, ( state, { workout, exerciseIndex, setIndex } ) =>
  {
    let currentRoute = getCurrentRoute( state );
    if( isExerciseSetRoute( currentRoute )
      && currentRoute.params.workout.id === workout.id
      && currentRoute.params.exerciseIndex === exerciseIndex
      && currentRoute.params.setIndex === setIndex )
    {
      return state;
    }
    else
    {
      return addRoute( state, {
        key: `workout:${workout.id}_exercise:${exerciseIndex}_set:${setIndex}`,
        routeName: Routes.ExerciseSet,
        params: {
          workout,
          exerciseIndex,
          setIndex
        }
      } );
    }
  } )
  .case( navigateToConnectIQ, ( state ) =>
  {
    let currentRoute = getCurrentRoute( state );
    if( currentRoute.routeName === Routes.ConnectIQ )
    {
      return state;
    }
    else
    {
      return addRoute( state, {
        key: Routes.ConnectIQ,
        routeName: Routes.ConnectIQ,
        params: {}
      } );
    }
  } )
  .case( navigateBack, ( state ) =>
  {
    if( state.index === 0 )
    {
      return state;
    }
    else
    {
      let routes = [ ...state.routes ];
      routes.pop();
      return {
        index: state.index - 1,
        routes: routes
      };
    }
  } );
