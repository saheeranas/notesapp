import {v4 as uuidv4} from 'uuid';
import dayjs from 'dayjs';
import {realm} from './index';
import rootStore from '../mst';
import {EntrySnapOutType} from '../types/types';

// Declaration
export const EntrySchema = {
  name: 'Entry',
  properties: {
    // _id: uuid4()
    _id: 'string',
    // desc: Random strings
    desc: 'string',
    // createdAt: UNIX timestamp
    createdAt: 'int',
    // modifiedAt: UNIX timestamp
    modifiedAt: 'int',
    // deleted: Boolean
    deleted: {type: 'bool', default: false},
  },
  primaryKey: '_id',
};

// Read All
const readEntriesFromDB = () => {
  const entries = realm
    .objects<EntrySnapOutType>('Entry')
    .sorted('modifiedAt', true);
  return entries;
};

// Add
const addEntryToDB = (item: EntrySnapOutType) => {
  let entry;

  realm.write(() => {
    // @ts-ignore
    entry = realm.create('Entry', {
      ...item,
      _id: item._id,
    });
  });
  return entry;
};

// Update
const updateEntryToDB = (item: EntrySnapOutType) => {
  const entries = realm.objects<EntrySnapOutType>('Entry');
  const res = entries.filtered('_id == $0', item._id);
  let entry;

  if (res.length) {
    // console.log('UPDATE: If Already exists');
    realm.write(() => {
      res[0].desc = item.desc;
      res[0].modifiedAt = dayjs(new Date()).valueOf();
      res[0].deleted = false;
    });
  } else {
    // console.log('UPDATE: Else, New Entry');
    realm.write(() => {
      // @ts-ignore
      entry = realm.create('Entry', {
        ...item,
        _id: uuidv4(),
        createdAt: dayjs(new Date()).valueOf(),
        modifiedAt: dayjs(new Date()).valueOf(),
      });
      // console.log(`Created entry: ${entry.date} `);
    });
  }
  return entry;
};

// Delete item (Soft)
const softDeleteOneEntryFromDB = (item: EntrySnapOutType) => {
  const res = realm.objectForPrimaryKey<EntrySnapOutType>('Entry', item._id);
  if (res) {
    realm.write(() => {
      res.deleted = true;
      res.modifiedAt = dayjs(new Date()).valueOf();
    });
  }
};

// Delete item (Hard)
const deleteOneEntryFromDB = (item: EntrySnapOutType) => {
  const resItem = realm.objectForPrimaryKey<EntrySnapOutType>(
    'Entry',
    item._id,
  );
  realm.write(() => {
    realm.delete(resItem);
  });
};

// Delete All
const deleteAllEntriesFromDB = () => {
  realm.write(() => {
    // Delete all objects from the realm.
    realm.deleteAll();
  });
};

/**
 * Import from JSON source (Google Drive)
 * @param {*} data - Syncable data from Google Drive and Local combined
 * TODO: Delete functionality
 */
const importToDBFromJSON = (data: any) => {
  let dataFromDB = readEntriesFromDB();
  // console.log('syncable Data:', data);
  // console.log('DB Data:', dataFromDB);
  realm.write(() => {
    data.entries.forEach((obj: any) => {
      let itemFoundInDB = dataFromDB.find(item => item._id === obj._id);
      if (!itemFoundInDB) {
        // If does not exist in DB, Create
        realm.create('Entry', obj);
      } else {
        if (itemFoundInDB.modifiedAt < obj.modifiedAt) {
          // If already exists && modified, Update
          itemFoundInDB.desc = obj.desc;
          itemFoundInDB.modifiedAt = obj.modifiedAt;
        }
      }
    });
  });
  // Hard delete the soft deleted
  let softDeleted = dataFromDB.filter(item => item.deleted === true);
  realm.write(() => {
    softDeleted.forEach(obj => {
      realm.delete(obj);
    });
  });
  rootStore.populateStoreFromDB();
};

export {
  readEntriesFromDB,
  addEntryToDB,
  updateEntryToDB,
  softDeleteOneEntryFromDB,
  deleteOneEntryFromDB,
  deleteAllEntriesFromDB,
  importToDBFromJSON,
};
