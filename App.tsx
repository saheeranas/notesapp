import React from 'react';
import {View, Text} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import rootStore, {MSTContext} from './src/mst';

//
import AppNavigation from './src/navigation/AppNavigation';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <MSTContext.Provider value={rootStore}>
            {/* <SafeAreaProvider> */}
            <AppNavigation />
            {/* <View>
          <Text>safdf</Text>
        </View> */}
            {/* </SafeAreaProvider> */}
          </MSTContext.Provider>
        </ApplicationProvider>
      </>
    </GestureHandlerRootView>
  );
};

export default App;
