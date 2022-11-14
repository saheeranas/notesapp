import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Icon, ButtonProps} from '@ui-kitten/components';

interface FABProps extends ButtonProps {
  onPress: () => void;
}

const AddIcon = () => (
  <Icon name="plus-outline" style={styles.icon} fill="#fff" />
);

const FAB = (props: FABProps) => {
  return (
    <Button
      style={styles.fab}
      {...props}
      onPress={() => props.onPress()}
      accessoryLeft={AddIcon}
      status="warning"
      testID="fab_button"
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    borderWidth: 0,
    position: 'absolute',
    elevation: 1,
    zIndex: 1,
    bottom: 16,
    right: 16,
    padding: 0,
  },
  icon: {width: 24, height: 24},
});

export default FAB;
