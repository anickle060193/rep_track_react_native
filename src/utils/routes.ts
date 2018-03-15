import { Workout } from "@utils/workout";
import { NavigationParams } from "react-navigation";

export const enum Routes
{
  Workouts = 'Workouts',
  NewWorkout = 'NewWorkout',
  Workout = 'Workout'
}

export interface BaseRouteParams<R extends Routes>
{
  route: R;
}

interface WorkoutRouteParams extends BaseRouteParams<Routes.Workout>
{
  workout: Workout;
}

export type RouteParams = (
  BaseRouteParams<Routes.Workouts | Routes.NewWorkout> |
  WorkoutRouteParams
);

export function isWorkoutRoute( params: RouteParams | NavigationParams | undefined ): params is WorkoutRouteParams
{
  return ( !!params && ( params as RouteParams ).route === Routes.Workout );
}
