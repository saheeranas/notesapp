import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {SafeAreaView} from 'react-native-safe-area-context';

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
            <SafeAreaView style={styles.safearea}>
              <StatusBar
                animated={true}
                backgroundColor="#ffd276"
                barStyle="default"
              />
              <AppNavigation />
            </SafeAreaView>
          </MSTContext.Provider>
        </ApplicationProvider>
      </>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
});

export default App;
