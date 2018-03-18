import { NavigationLeafRoute } from 'react-navigation';

import { Workout } from '@utils/workout';

export const enum Routes
{
  Workouts = 'Workouts',
  Workout = 'Workout',
  Exercise = 'Exercise',
  ExerciseSet = 'ExerciseSet',
  ConnectIQ = 'ConnectIQ'
}

export interface WorkoutRouteParams
{
  workout: Workout;
  editing: boolean;
}

export interface ExerciseRouteParams
{
  workout: Workout;
  exerciseIndex: number;
}

export interface ExerciseSetRouteParams
{
  workout: Workout;
  exerciseIndex: number;
  setIndex: number;
}

export type RouteParams = (
  {} |
  WorkoutRouteParams |
  ExerciseRouteParams |
  ExerciseSetRouteParams
);

interface BaseRouteLeaf<R extends Routes, P extends RouteParams = {}> extends NavigationLeafRoute
{
  routeName: R;
  params: P;
}

type WorkoutRouteLeaf = BaseRouteLeaf<Routes.Workout, WorkoutRouteParams>;
type ExerciseRouteLeaf = BaseRouteLeaf<Routes.Exercise, ExerciseRouteParams>;
type ExerciseSetRouteLeaf = BaseRouteLeaf<Routes.ExerciseSet, ExerciseSetRouteParams>;

export type RouteLeaf = (
  BaseRouteLeaf<Routes.Workouts | Routes.ConnectIQ, {}> |
  WorkoutRouteLeaf |
  ExerciseRouteLeaf |
  ExerciseSetRouteLeaf
);

type PossibleRoute = RouteLeaf | NavigationLeafRoute | undefined;

export function isWorkoutRoute( route: PossibleRoute ): route is WorkoutRouteLeaf
{
  return (
    !!route
    && route.routeName === Routes.Workout
    && !!route.params
    && !!( ( route as WorkoutRouteLeaf ).params.workout )
  );
}

export function isExerciseRoute( route: PossibleRoute ): route is ExerciseRouteLeaf
{
  return (
    !!route
    && route.routeName === Routes.Exercise
    && !!route.params
    && !!( ( route as ExerciseRouteLeaf ).params.workout )
    && ( route as ExerciseRouteLeaf ).params.exerciseIndex >= 0
  );
}

export function isExerciseSetRoute( route: PossibleRoute ): route is ExerciseSetRouteLeaf
{
  return (
    !!route
    && route.routeName === Routes.ExerciseSet
    && !!route.params
    && !!( ( route as ExerciseSetRouteLeaf ).params.workout )
    && ( route as ExerciseSetRouteLeaf ).params.exerciseIndex >= 0
    && ( route as ExerciseSetRouteLeaf ).params.setIndex >= 0
  );
}
