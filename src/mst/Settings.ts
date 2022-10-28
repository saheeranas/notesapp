import {types} from 'mobx-state-tree';

const Settings = types
  .model('Settings', {
    lastSynced: types.string,
  })
  .actions(self => ({
    updateLastSynced(status: string) {
      self.lastSynced = status;
    },
    removeLastSynced() {
      self.lastSynced = '';
    },
  }));

export default Settings;
