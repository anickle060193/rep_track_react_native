import * as React from 'react';

import AppBarIconButton from '@components/AppBarIconButton';

const DoneButton: React.SFC<{
  onPress: () => void;
}> = ( { onPress } ) => (
  <AppBarIconButton iconName="done" onPress={onPress} />
);

export default DoneButton;
