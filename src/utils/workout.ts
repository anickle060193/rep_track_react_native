import moment from 'moment';

import { range } from '@utils';

export interface ExerciseSet
{
  completed: boolean;
  weight: number;
  repCount: number;
  data: {};
}

export interface Exercise
{
  name: string;
  sets: ExerciseSet[];
}

export interface Workout
{
  id: string;
  date: Date;
  exercises: Exercise[];
}

export type WorkoutsMap = { [ id: string ]: Workout };

export function workoutsMapToArray( workouts: WorkoutsMap )
{
  return Object.keys( workouts ).map( ( id ) => workouts[ id ] );
}

export function workoutsArrayToMap( workouts: Workout[] )
{
  let workoutsMap: WorkoutsMap = {};
  for( let workout of workouts )
  {
    workoutsMap[ workout.id ] = workout;
  }
  return workoutsMap;
}

export function formatWorkoutName( workout: Workout )
{
  return moment( workout.date ).format( 'L' );
}

export function createNewExercise( name: string, setCount: number, repCount: number, weight: number ): Exercise
{
  return {
    name,
    sets: range( setCount ).map<ExerciseSet>( () => ( {
      completed: false,
      weight,
      repCount,
      data: {}
    } ) )
  };
}
