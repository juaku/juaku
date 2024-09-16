/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from '../App';
import {name as appName} from '../app.json';
import { Platform } from 'react-native';
import { render } from 'react-dom';

if (Platform.OS === 'web') {
  AppRegistry.registerComponent(appName, () => App);
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById('root'),
  });
} else {
  AppRegistry.registerComponent(appName, () => App);
}
