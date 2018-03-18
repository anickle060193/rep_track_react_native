import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { MKColor } from 'react-native-material-kit';
import Touchable from 'react-native-platform-touchable';

const FAB_MARGIN = 16;
const FAB_ELEVATION = 4;
const FAB_SIZE = 56;
const FAB_ICON_SIZE = 24;

interface Props
{
  onPress: () => void;
  iconName: string;

  show?: boolean;
  backgroundColor?: string;
  selfPosition?: boolean;
}

export default class Fab extends React.Component<Props>
{
  static defaultProps: Partial<Props> = {
    selfPosition: true,
    backgroundColor: MKColor.DeepOrange,
    show: true
  };

  render()
  {
    return (
      <View
        style={[
          styles.fabContainer,
          styles.fab,
          this.props.selfPosition ? styles.selfPositioned : undefined,
          this.props.show ? undefined : styles.hide
        ]}
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
      </View>
    );
  }
}

const styles = StyleSheet.create( {
  fabContainer: {
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
  },
  selfPositioned: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    margin: FAB_MARGIN
  },
  hide: {
    display: 'none'
  }
} );
