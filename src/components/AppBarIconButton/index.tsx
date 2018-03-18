import * as React from 'react';
import { TouchableNativeFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AppBarIconButton: React.SFC<{
  iconName: string;
  onPress: () => void;
}> = ( { iconName, onPress } ) => (
  <TouchableNativeFeedback
    background={TouchableNativeFeedback.SelectableBackgroundBorderless()}
    onPress={onPress}
  >
    <View style={{ height: 56, width: 56, alignItems: 'center', justifyContent: 'center' }}>
      <Icon
        name={iconName}
        style={{ color: 'white', fontSize: 40 }}
      />
    </View>
  </TouchableNativeFeedback>
);

export default AppBarIconButton;
