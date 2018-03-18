import { NativeModules } from 'react-native';

export const REP_TRACK_APP_ID = '2649146e00df42358fb239388daf724b';

export enum IQSdkErrorStatus
{
  GCM_NOT_INSTALLED,
  GCM_UPGRADE_NEEDED,
  SERVICE_ERROR
}

export enum IQDeviceStatus
{
  NOT_PAIRED,
  NOT_CONNECTED,
  CONNECTED,
  UNKNOWN
}

export interface IQDevice // tslint:disable-line:interface-name
{
  id: string;
  name: string;
  status: number;
}

export enum IQAppStatus
{
  UNKNOWN,
  INSTALLED,
  NOT_INSTALLED,
  NOT_SUPPORTED
}

export interface IQApp // tslint:disable-line:interface-name
{
  applicationID: string;
  status: IQAppStatus;
  displayName: string;
  version: number;
}

export enum IQOpenApplicationStatus
{
  PROMPT_SHOWN_ON_DEVICE,
  PROMPT_NOT_SHOWN_ON_DEVICE,
  APP_IS_NOT_INSTALLED,
  APP_IS_ALREADY_RUNNING,
  UNKNOWN_FAILURE
}

export enum IQMessageStatus
{
  SUCCESS,
  FAILURE_UNKNOWN,
  FAILURE_INVALID_FORMAT,
  FAILURE_MESSAGE_TOO_LARGE,
  FAILURE_UNSUPPORTED_TYPE,
  FAILURE_DURING_TRANSFER,
  FAILURE_INVALID_DEVICE,
  FAILURE_DEVICE_NOT_CONNECTED
}

interface ConnectIQNativeModule
{
  initialize(): Promise<void>;

  isInitialized(): Promise<boolean>;

  isSdkReady(): Promise<boolean>;

  getDevices(): Promise<IQDevice[]>;

  getApplicationInfo( deviceId: string, applicationId: string ): Promise<IQApp | string>;

  openApplication( deviceId: string, applicationId: string ): Promise<IQOpenApplicationStatus>;

  sendMessage( deviceId: string, applicationId: string, data: {} ): void;
}

const ConnectIQ = NativeModules.ConnectIQ as ConnectIQNativeModule;

export default ConnectIQ;
