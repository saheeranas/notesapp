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
      <Input style={styles.searchInput} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  textarea: {
    borderWidth: 0,
  },
  // Search
  searchCard: {
    backgroundColor: 'transparent',
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 3,
  },
  searchInput: {
    backgroundColor: '#ececec',
  },
});
