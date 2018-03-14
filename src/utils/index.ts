import { NavigationParams } from 'react-navigation';

export function navParams<T>( params: NavigationParams | undefined, paramsGetter: ( params: NavigationParams ) => T, defaultParam?: T ): T | undefined
{
  return params ? paramsGetter( params ) : defaultParam;
}
