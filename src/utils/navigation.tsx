import * as React from 'react';
import { NavigationScreenProps, NavigationStackScreenOptions, NavigationRoute, NavigationScreenConfig } from 'react-navigation';

export type ScreenConfig<ParamsProps> = NavigationStackScreenOptions | ( ( paramsProps: ParamsProps ) => NavigationStackScreenOptions );

export interface ScreenComponent<ParamsProps, OwnProps> extends React.ComponentClass<ParamsProps & OwnProps>
{
  navigationOptions?: ScreenConfig<ParamsProps>;
}

type ParamsMapper<P> = ( navigation: NavigationRoute ) => P;

export function mapParamsToProps<ParamsProps = {}, OwnProps = {}>( mapper: ParamsMapper<ParamsProps> )
{
  return ( ChildComponent: ScreenComponent<ParamsProps, OwnProps> ) =>
  {
    return class extends React.Component<OwnProps & NavigationScreenProps>
    {
      static navigationOptions: NavigationScreenConfig<NavigationStackScreenOptions> = ( navigation ) =>
      {
        if( typeof ChildComponent.navigationOptions === 'function' )
        {
          return ChildComponent.navigationOptions( mapper( navigation.navigation.state ) );
        }
        else if( ChildComponent.navigationOptions )
        {
          return ChildComponent.navigationOptions;
        }
        else
        {
          return {};
        }
      };

      render()
      {
        let propsCopy = Object.assign( {}, this.props ) as ( OwnProps & NavigationScreenProps );
        delete propsCopy.navigation;
        delete propsCopy.navigationOptions;
        delete propsCopy.screenProps;
        delete ( propsCopy as any ).children;

        let paramProps = mapper( this.props.navigation.state );

        return (
          <ChildComponent {...paramProps} {...( propsCopy as OwnProps )} />
        );
      }
    };
  };
}
