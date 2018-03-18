import * as React from 'react';
import { StyleSheet, Animated, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MKColor } from 'react-native-material-kit';
import Touchable from 'react-native-platform-touchable';

const FAB_MARGIN = 16;
const FAB_ELEVATION = 4;
const FAB_SIZE = 56;
const FAB_ICON_SIZE = 24;

const FAB_HIDE_ANIMATION_DURATION = 250;
const FAB_HIDDEN_OFFSET = 2 * FAB_SIZE + FAB_MARGIN;

interface Props
{
  onPress: () => void;
  iconName: string;

  show?: boolean;
  backgroundColor?: string;
}

interface State
{
  offsetY: Animated.Value;
}

export default class Fab extends React.Component<Props, State>
{
  static defaultProps: Partial<Props> = {
    backgroundColor: MKColor.DeepOrange,
    show: true
  };

  constructor( props: Props )
  {
    super( props );

    this.state = {
      offsetY: new Animated.Value( this.props.show ? 0 : FAB_HIDDEN_OFFSET )
    };
  }

  componentWillReceiveProps( newProps: Props )
  {
    if( this.props.show !== newProps.show )
    {
      Animated.timing(
        this.state.offsetY,
        {
          toValue: newProps.show ? 0 : FAB_HIDDEN_OFFSET,
          duration: FAB_HIDE_ANIMATION_DURATION
        }
      ).start();
    }
  }

  render()
  {
    return (
      <Animated.View
        style={[
          styles.fabContainer,
          styles.fab,
          {
            transform: [ {
              translateY: this.state.offsetY as any as number // tslint:disable-line:no-any
            } ]
          } as ViewStyle
        ] as ViewStyle}
      >
        <Touchable
          style={[
            styles.fab,
            {
              backgroundColor: this.props.backgroundColor
            }
          ]}
          background={Touchable.Ripple( '#fff', true )}
          onPress={this.props.onPress}
        >
          <Icon
            color="white"
            name={this.props.iconName}
            style={styles.fabIcon}
          />
        </Touchable>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create( {
  fabContainer: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: FAB_MARGIN,
    elevation: FAB_ELEVATION
  },
  fab: {
    borderRadius: FAB_SIZE / 2,
    width: FAB_SIZE,
    height: FAB_SIZE,
    alignItems: 'center',
    justifyContent: 'center'
  },
  fabIcon: {
    fontSize: FAB_ICON_SIZE
  }
} );
