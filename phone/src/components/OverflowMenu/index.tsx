import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

import AppBarIconButton from '@components/AppBarIconButton';
import Menu, { Props as MenuProps } from '@components/Menu';

const FROM = {
  opacity: 0,
  translateY: -100
};

const TO = {
  opacity: 1,
  translateY: 0
};

interface State
{
  show: boolean;
}

type Props = MenuProps;

export default class OverflowMenu extends React.Component<Props, State>
{
  constructor( props: Props )
  {
    super( props );

    this.state = {
      show: false
    };
  }

  render()
  {
    return (
      <View>
        <AppBarIconButton
          iconName="more-vert"
          onPress={this.onOpen}
        />
        <Modal
          style={styles.modal}
          isVisible={this.state.show}
          backdropOpacity={0}
          onBackButtonPress={this.onClose}
          onBackdropPress={this.onClose}
          animationIn={{ from: FROM, to: TO }}
          animationOut={{ from: TO, to: FROM }}
        >
          <Menu
            items={this.props.items}
            onItemPress={this.onClose}
          />
        </Modal>
      </View>
    );
  }

  private onOpen = () =>
  {
    this.setState( { show: true } );
  }

  private onClose = () =>
  {
    this.setState( { show: false } );
  }
}

const styles = StyleSheet.create( {
  modal: {
    right: 0,
    top: 0,
    position: 'absolute',
    overflow: 'visible',
    margin: 0,
    padding: 4
  }
} );
