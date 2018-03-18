import * as React from 'react';
import { connect } from 'react-redux';
import { NavigationScreenOptions } from 'react-navigation';
import { Text, FlatList, StyleSheet, View } from 'react-native';
import Touchable from 'react-native-platform-touchable';
import { MKColor } from 'react-native-material-kit';

import { navigateBack } from '@store/reducers/navigation';
import { setConnectIQDevice } from '@store/reducers/connectIQ';

import ConnectIQ, { IQDevice, IQDeviceStatus } from '@utils/connectIQ';

const connectionStatus = {
  [ IQDeviceStatus.CONNECTED ]: 'Connected',
  [ IQDeviceStatus.NOT_CONNECTED ]: 'Not Connected',
  [ IQDeviceStatus.NOT_PAIRED ]: 'Not Paired',
  [ IQDeviceStatus.UNKNOWN ]: 'Unknown'
};

interface PropsFromDispatch
{
  setConnectIQDevice: typeof setConnectIQDevice;
  navigateBack: typeof navigateBack;
}

type Props = PropsFromDispatch;

interface State
{
  initialized: boolean;
  ready: boolean;
  retrievingDevices: boolean;
  devices: IQDevice[];
}

class ConnectIQDevicesScreen extends React.Component<Props, State>
{
  static navigationOptions: NavigationScreenOptions = {
    title: 'Connect IQ Devices'
  };

  constructor( props: Props )
  {
    super( props );

    this.state = {
      initialized: false,
      ready: false,
      retrievingDevices: false,
      devices: []
    };
  }

  async componentDidMount()
  {
    if( !( await ConnectIQ.isInitialized() ) )
    {
      await ConnectIQ.initialize();

      this.setState( {
        initialized: true,
        ready: true,
        retrievingDevices: true
      } );

      this.setState( {
        devices: await ConnectIQ.getDevices(),
        retrievingDevices: false
      } );
    }
    else if( !( await ConnectIQ.isSdkReady ) )
    {
      this.setState( {
        initialized: true,
        ready: false,
        retrievingDevices: false,
        devices: []
      } );
    }
    else
    {
      this.setState( {
        initialized: true,
        ready: true,
        retrievingDevices: true
      } );

      this.setState( {
        devices: await ConnectIQ.getDevices(),
        retrievingDevices: false
      } );
    }
  }

  render()
  {
    if( !this.state.initialized )
    {
      return (
        <Text>Not initialized</Text>
      );
    }
    else if( !this.state.ready )
    {
      return (
        <Text>Not Ready</Text>
      );
    }
    else
    {
      return (
        <View style={styles.column}>
          <FlatList
            style={styles.devicesList}
            data={this.state.devices}
            keyExtractor={( device: IQDevice ) => device.id}
            renderItem={( { item: device } ) => (
              <ConnectIQDeviceListItem
                device={device}
                onPress={() => this.onDevicePress( device )}
              />
            )}
          />
          <Touchable
            background={Touchable.SelectableBackground()}
            style={styles.refreshButton}
            onPress={this.onRefreshPress}
            disabled={!this.canRefresh()}
          >
            <Text style={styles.refreshButtonText}>
              Refresh
            </Text>
          </Touchable>
        </View>
      );
    }
  }

  private canRefresh()
  {
    return (
      this.state.initialized
      && this.state.ready
      && !this.state.retrievingDevices
    );
  }

  private onRefreshPress = async () =>
  {
    if( this.canRefresh() )
    {
      this.setState( {
        retrievingDevices: true
      } );

      this.setState( {
        devices: await ConnectIQ.getDevices(),
        retrievingDevices: false
      } );
    }
  }

  private onDevicePress = ( device: IQDevice ) =>
  {
    this.props.setConnectIQDevice( device );
    this.props.navigateBack( undefined );
  }
}

const ConnectIQDeviceListItem: React.SFC<{ device: IQDevice, onPress: () => void }> = ( { device, onPress } ) => (
  <Touchable
    background={Touchable.SelectableBackground()}
    onPress={onPress}
  >
    <View style={styles.deviceListItem}>
      <Text style={styles.deviceListItemText}>
        {device.name} - {device.id} - {connectionStatus[ device.status ] || 'Unknown'}
      </Text>
    </View>
  </Touchable>
);

const styles = StyleSheet.create( {
  column: {
    flex: 1,
    flexDirection: 'column'
  },
  devicesList: {
    flex: 1
  },
  deviceListItem: {
    padding: 16,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1
  },
  deviceListItemText: {
    fontSize: 26
  },
  refreshButton: {
    alignItems: 'center',
    backgroundColor: MKColor.DeepOrange,
    padding: 16
  },
  refreshButtonText: {
    fontSize: 24,
    color: 'white'
  }
} );

export default connect<{}, PropsFromDispatch, {}, RootState>(
  ( state ) => ( {} ),
  {
    setConnectIQDevice,
    navigateBack
  }
)( ConnectIQDevicesScreen );
