import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from '@ui-kitten/components';

const FAB = (props: any) => {
  return (
    <Button style={styles.fab} {...props} onPress={() => props.onPress()}>
      Add
    </Button>
  );
};

const styles = StyleSheet.create({
  fab: {
    height: 50,
    borderWidth: 0,
    position: 'absolute',
    elevation: 1,
    zIndex: 1,
    bottom: 20,
    right: 20,
    padding: 0,
  },
  icon: {width: 32, height: 32},
});

export default FAB;
