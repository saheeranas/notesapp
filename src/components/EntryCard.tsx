import React from 'react';
import {StyleSheet, View, Pressable} from 'react-native';

import {Text} from '@ui-kitten/components';
import dayjs from 'dayjs';

interface EntryCardProps {
  item: any;
  onPress: () => void;
}

const EntryCard: React.FC<EntryCardProps> = ({item: {desc, date}, onPress}) => {
  const dayStr = dayjs(date).format('MMM D h:mm A');
  return (
    <Pressable style={styles.listItem} onPress={onPress}>
      <View style={styles.listItemInner}>
        <Text style={styles.desc}>{desc.substr(0, 50)}</Text>
        <View style={styles.dateWrp}>
          <Text style={styles.dayStr}>{dayStr}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default EntryCard;

const styles = StyleSheet.create({
  listItem: {
    marginBottom: 10,
    width: '48%',
  },
  listItemInner: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignItems: 'flex-start',
  },
  dateWrp: {
    marginBottom: 3,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
    paddingTop: 8,
  },
  dayStr: {
    fontSize: 10,
    color: '#333333',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  desc: {
    fontSize: 15,
    color: '#333333',
    flex: 1,
    maxHeight: 40,
    paddingBottom: 8,
  },
});
