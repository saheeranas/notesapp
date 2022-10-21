import React, {forwardRef} from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import {Input, InputProps} from '@ui-kitten/components';

interface SearchProps extends InputProps {}

export const TextArea = forwardRef((props: any, ref) => {
  return <TextInput ref={ref} style={styles.textarea} {...props} />;
});

export const Search = (props: SearchProps) => {
  return (
    <View style={styles.searchCard}>
      <Input {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  textarea: {
    borderWidth: 0,
    backgroundColor: 'cyan',
  },
  // Search
  searchCard: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
});
