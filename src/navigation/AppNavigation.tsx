// @ts-nocheck
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {observer} from 'mobx-react-lite';

// Stack
import Entries from '../screens/Entries';
import Settings from '../screens/Settings';
import EntrySingle from '../screens/EntrySingle';

const Stack = createStackNavigator();

const AppNavigation = observer(() => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Entries" component={Entries} />
        <Stack.Screen name="EntrySingle" component={EntrySingle} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default AppNavigation;
