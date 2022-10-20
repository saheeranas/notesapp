import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <View>
            <Text>safdf</Text>
          </View>
        </NavigationContainer>
      </ApplicationProvider>
    </GestureHandlerRootView>
  );
};

export default App;
