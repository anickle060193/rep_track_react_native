import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Touchable from 'react-native-platform-touchable';

interface MenuItemProp
{
  text: string;
  onPress: () => void;
}

export interface Props
{
  items: MenuItemProp[];
  onItemPress?: () => void;
}

export default class Menu extends React.Component<Props>
{
  render()
  {
    return (
      <View style={styles.menu}>
        {this.props.items.map( ( { text, onPress }, i ) => (
          <Touchable
            key={i}
            background={Touchable.SelectableBackground()}
            onPress={() => this.onItemPress( onPress )}
          >
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>
                {text}
              </Text>
            </View>
          </Touchable>
        ) )}
      </View>
    );
  }

  private onItemPress = ( itemOnPress: () => void ) =>
  {
    if( this.props.onItemPress )
    {
      this.props.onItemPress();
    }

    itemOnPress();
  }
}

const styles = StyleSheet.create( {
  menu: {
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 4,
    flexDirection: 'column',
    minWidth: 56 * 3
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 16,
    paddingVertical: 20
  },
  menuItemText: {
    fontSize: 22
  }
} );
