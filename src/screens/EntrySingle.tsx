import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import dayjs from 'dayjs';

import {Button, Text, Modal, Menu, MenuItem, Icon} from '@ui-kitten/components';

import {MSTContext} from '../mst';

import {EntrySingleType} from '../types/types';
import {Layout} from '../components/Layout';
import Header from '../components/Header';

const DeleteIcon = () => (
  <Icon name="trash-2-outline" fill="red" style={styles.menuIcon} />
);

const initialText = '';

const EntrySingle: React.FC<EntrySingleType> = observer(
  ({route, navigation}) => {
    const store = useContext(MSTContext);
    const [menuVisible, setMenuVisible] = useState(false);
    const editorRef = useRef(null);
    const [inputData, setInputData] = React.useState(initialText);
    const [active, setActive] = useState<any>(null);
    const [editable, setEditable] = useState(false);

    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        setInputData(initialText);
        let tempId;
        if (route.params?.id) {
          tempId = route.params.id;
        } else {
          tempId = uuidv4();
        }
        const temp = store.findEntryByDate(tempId);
        if (temp.length) {
          setActive(temp[0]);
          setInputData(temp[0].desc);
        }
        navigation.setParams({id: null});
      });

      return unsubscribe;
    }, [route, navigation, store]);

    const deleteEntry = () => {
      Alert.alert(
        'Are you sure?',
        'This will permanently delete the entry from the device',
        [
          {
            text: 'Cancel',
            onPress: () => {},
            style: 'cancel',
          },
          {text: 'OK', onPress: () => confirmDelete()},
        ],
      );
    };

    const confirmDelete = () => {
      // Clear entry from text input
      setInputData(initialText);

      // Delete from Store
      if (active) {
        // Edge case: Empty entry but not saved in MST and DB
        if (active.desc?.trim() === '') {
          return;
        }
        store.deleteEntry(active);
        setActive(null);
        navigation.goBack();
      }
    };

    const addEntry = () => {
      if (inputData.trim() !== '') {
        if (!active) {
          store.addEntry({
            _id: uuidv4(),
            desc: inputData,
            createdAt: dayjs(new Date()).valueOf(),
            modifiedAt: dayjs(new Date()).valueOf(),
          });
        } else {
          store.updateEntry({
            _id: active._id,
            createdAt: active.createdAt,
            desc: inputData,
            modifiedAt: dayjs(new Date()).valueOf(),
          });
        }
      }

      setInputData(initialText);
      setActive(null);
      navigation.goBack();
    };

    return (
      <Layout level="1">
        <Header
          navigation={navigation}
          title=""
          onPressMenu={() => setMenuVisible(true)}
        />
        <View style={styles.statusTextWrp}>
          <View>
            {active && (
              <Text style={styles.statusText}>
                {dayjs(active.modifiedAt).format('DD/MM/YYYY hh:mm A')}
              </Text>
            )}
          </View>
          {editable && (
            <Button
              size="tiny"
              status="warning"
              appearance="outline"
              style={[styles.btn, styles.btnSave]}
              onPress={addEntry}>
              Save
            </Button>
          )}
        </View>

        <ScrollView contentContainerStyle={styles.scrollview}>
          <View style={styles.inner}>
            {editable ? (
              <TextInput
                autoFocus
                value={inputData}
                style={styles.textArea}
                multiline={true}
                onChangeText={(text: string) => setInputData(text)}
                onBlur={addEntry}
              />
            ) : (
              <TouchableOpacity onPress={() => setEditable(true)}>
                <View style={styles.textWrapper}>
                  <Text>{inputData ? inputData : 'Tap to Edit'}</Text>
                </View>
              </TouchableOpacity>
            )}

            {/* <View style={styles.btnWrp}>
              {editable && (
                <Button
                  size="small"
                  status="primary"
                  style={[styles.btn, styles.btnSave]}
                  onPress={addEntry}>
                  Save
                </Button>
              )}
            </View> */}
          </View>
        </ScrollView>
        {/* Menu */}
        <Modal
          visible={menuVisible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setMenuVisible(false)}>
          <View style={styles.card}>
            <Menu>
              <MenuItem
                title="Delete"
                accessoryLeft={DeleteIcon}
                onPress={() => {
                  setMenuVisible(false);
                  deleteEntry();
                }}
              />
            </Menu>
          </View>
        </Modal>
        {/* end Menu */}
      </Layout>
    );
  },
);

export default EntrySingle;

const styles = StyleSheet.create({
  scrollview: {
    flexGrow: 1,
  },
  inner: {
    paddingVertical: 5,
  },
  textWrapper: {
    minHeight: 250,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 0,
    borderRadius: 8,
    textAlignVertical: 'top',
    marginBottom: 20,
    backgroundColor: 'transparent',
    fontSize: 14,
  },
  textArea: {
    height: 250,
    paddingHorizontal: 20,
    borderWidth: 0,
    borderRadius: 8,
    textAlignVertical: 'top',
    marginBottom: 20,
    backgroundColor: 'transparent',
    fontSize: 14,
  },
  btnWrp: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  btn: {
    marginBottom: 10,
  },
  btnSave: {
    marginBottom: 0,
    // width: 10,
    // height: 5,
    padding: 0,
  },
  statusTextWrp: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 11,
    marginBottom: 10,
    fontStyle: 'italic',
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
