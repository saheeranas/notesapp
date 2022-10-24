import React from 'react';
import {types, destroy} from 'mobx-state-tree';

// Stores
import DiaryEntry from './DiaryEntry';
import User from './User';
import Settings from './Settings';

// Realm DB Ops
import {
  readEntriesFromDB,
  addEntryToDB,
  updateEntryToDB,
  softDeleteOneEntryFromDB,
} from '../db/entry';

const RootStore = types
  .model({
    entries: types.array(DiaryEntry),
    user: types.maybe(User),
    settings: types.maybe(Settings),
  })
  .views(self => ({
    getData() {
      return self.entries.sort((a, b) => b.modifiedAt - a.modifiedAt);
    },
    findEntryByDate(_id) {
      return self.entries.filter(e => e._id === _id);
    },
  }))
  .actions(self => ({
    populateStoreFromDB() {
      let itemsFromDB = readEntriesFromDB();
      let temp = JSON.parse(JSON.stringify(itemsFromDB));
      // console.log(temp);
      let modifieddata = temp
        .map(item => {
          const {deleted, ...rest} = item;
          return deleted ? null : rest;
        })
        .filter(Boolean);
      self.entries = modifieddata;
    },
    addEntry(entry) {
      self.entries.unshift(entry);
      addEntryToDB(entry);
    },
    updateEntry(entry) {
      let pos = self.entries.findIndex(e => e._id === entry._id);
      if (pos >= 0) {
        self.entries.splice(pos, 1, entry);
      } else {
        self.entries.unshift(entry);
      }
      updateEntryToDB(entry);
    },
    deleteEntry(entry) {
      softDeleteOneEntryFromDB(entry);
      destroy(entry);
    },
  }));

const rootStore = RootStore.create({
  entries: [
    // {
    //   _id: 'b91289ce-c2fe-43ed-9830-f5cb5f222a7b',
    //   date: '2021-11-16',
    //   desc: 'lorem ipsum',
    //   createdAt: 1637330913,
    //   modifiedAt: 1637330913,
    // },
  ],
  user: {
    _id: '',
    name: '',
    email: '',
    photo: '',
    isSecure: true,
    isUnlocked: false,
  },
  settings: {
    lastSynced: '',
  },
});

export default rootStore;
export const MSTContext = React.createContext(null);
