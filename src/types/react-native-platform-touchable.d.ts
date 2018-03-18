
declare module 'react-native-platform-touchable'
{
  import * as React from 'react';
  import
  {
    TouchableOpacityProperties,
    TouchableHighlightProperties,
    TouchableNativeFeedbackProperties,
    TouchableWithoutFeedbackProperties,
    TouchableNativeFeedback
  } from 'react-native';

  class TouchableBackground { }

  interface Props extends TouchableOpacityProperties, TouchableHighlightProperties, TouchableNativeFeedbackProperties, TouchableWithoutFeedbackProperties
  {
  }

  export default class Touchable extends React.Component<Props>
  {
    static SelectableBackground: typeof TouchableNativeFeedback.SelectableBackground;
    static SelectableBackgroundBorderless: typeof TouchableNativeFeedback.SelectableBackgroundBorderless;
    static Ripple: typeof TouchableNativeFeedback.Ripple;
  }
}
