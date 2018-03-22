import * as React from 'react';

import AppBarIconButton from '@components/AppBarIconButton';

const EditButton: React.SFC<{
  onPress: () => void;
}> = ( { onPress } ) => (
  <AppBarIconButton iconName="edit" onPress={onPress} />
);

export default EditButton;
