/**
 * @format
 */
import { LogBox } from 'react-native';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
