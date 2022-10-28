import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {observer, Observer} from 'mobx-react-lite';
import {toJS} from 'mobx';

import {
  List,
  Divider,
  Icon,
  Modal,
  Menu,
  MenuItem,
} from '@ui-kitten/components';

// import {readEntriesFromDB, deleteAllEntriesFromDB} from '../db/entry';
import {MSTContext} from '../mst';

import {EntriesProps} from '../types/types';
import {Layout} from '../components/Layout';
import Header from '../components/Header';
import {Search} from '../components/Form';
import EntryCard from '../components/EntryCard';
import NoData from '../components/NoData';
import FAB from '../components/FAB';

const SettingsIcon = () => (
  <Icon name="settings-outline" fill="#ccc" style={styles.menuIcon} />
);

const Entries = observer(({navigation}: EntriesProps) => {
  const store = useContext(MSTContext);
  const [menuVisible, setMenuVisible] = useState(false);

  const [value, setValue] = useState('');

  const [isRefreshing, setRefreshing] = useState(false);

  useEffect(() => {
    refreshData();
    refreshOtherData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshData = () => {
    setRefreshing(true);
    store.populateStoreFromDB();
    setRefreshing(false);
  };

  const refreshOtherData = () => {
    store?.user?.populateUserFromDB();
  };

  const navigateToDetail = (id = null) => {
    navigation.navigate('EntrySingle', {id});
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  // console.log(store);

  const renderItem = ({item}: any) => {
    return (
      <Observer>
        {() => (
          <EntryCard
            key={`entrycard-${item._id}`}
            item={item}
            onPress={() => navigateToDetail(item._id)}
          />
        )}
      </Observer>
    );
  };

  let data = store.entries.filter(e => e.desc.includes(value));

  return (
    <Layout>
      <Header
        navigation={navigation}
        title="Notes"
        hideBack={true}
        onPressMenu={() => setMenuVisible(true)}
      />

      <Search
        placeholder="Search Notes"
        value={value}
        onChangeText={nextValue => setValue(nextValue)}
      />
      <List
        style={styles.list}
        contentContainerStyle={styles.contentContainerStyle}
        numColumns={2}
        columnWrapperStyle={styles.listColumWrpStyle}
        data={data.slice()}
        extraData={toJS(data)}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
        refreshing={isRefreshing}
        onRefresh={refreshData}
        ListEmptyComponent={
          <NoData title="Add a new entry by pressing + button" />
        }
      />
      <FAB onPress={navigateToDetail} />
      {/* Menu */}
      <Modal
        visible={menuVisible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setMenuVisible(false)}>
        <View style={styles.card}>
          <Menu>
            <MenuItem
              title="Settings"
              accessoryLeft={SettingsIcon}
              onPress={() => {
                setMenuVisible(false);
                navigateToSettings();
              }}
            />
          </Menu>
        </View>
      </Modal>
      {/* end Menu */}
    </Layout>
  );
});

export default Entries;

const styles = StyleSheet.create({
  dateWrp: {
    paddingHorizontal: 16,
  },
  list: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F4F4F4',
  },
  listColumWrpStyle: {
    justifyContent: 'space-between',
  },
  contentContainerStyle: {
    paddingBottom: 100,
    flexGrow: 1,
  },
  btnWrpAbsolute: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  btnAdd: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  // modal menu
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    padding: 5,
    backgroundColor: '#fff',
    width: 280,
    borderRadius: 10,
  },
  menuIcon: {width: 20, height: 20},
});
