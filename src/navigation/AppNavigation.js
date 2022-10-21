import * as React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from '@ui-kitten/components';
import {observer} from 'mobx-react-lite';

import {MSTContext} from '../mst';

// Functions
// import {getPasswordStatus} from '../utils/password';

// Password
// import Password from '../screens/security/Password';

// Tab
import Entries from '../screens/Entries';
import Settings from '../screens/Settings';
import EntrySingle from '../screens/EntrySingle';

import Header from '../components/Header';

const Stack = createStackNavigator();

const AppNavigation = observer(() => {
  const store = React.useContext(MSTContext);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: ({navigation, route, options}) => {
            return (
              <Header
                title={options.tabBarLabel}
                navigation={navigation}
                hideBack={!options.headerBackBtnShown}
              />
            );
          },
        }}>
        <Stack.Screen
          name="Entries"
          component={Entries}
          options={{tabBarLabel: 'Notes'}}
        />
        <Stack.Screen
          name="EntrySingle"
          component={EntrySingle}
          options={{tabBarLabel: 'EntrySingle'}}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{tabBarLabel: 'Settings'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});

export default AppNavigation;
