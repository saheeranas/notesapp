import React from 'react';
import {StyleSheet} from 'react-native';
import {Layout as UILayout} from '@ui-kitten/components';

export const Layout = ({children}) => {
  return <UILayout style={styles.layout}>{children}</UILayout>;
};

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  layout: {
    position: 'relative',
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
});
