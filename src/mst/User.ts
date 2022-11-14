import {types} from 'mobx-state-tree';
import {getUserFromDB, updateUserToDB, clearUserFromDB} from '../db/user';
import {UserSnapInType} from '../types/types';

const User = types
  .model('User', {
    _id: types.string,
    name: types.string,
    email: types.string,
    photo: types.string,
    isSecure: types.boolean, // true if user opted for password protection
    isUnlocked: types.boolean, // true if user unlocked from password screen
  })
  .views(self => ({
    getData() {
      return self;
    },
  }))
  .actions(self => ({
    populateUserFromDB() {
      let itemFromDB = getUserFromDB();
      if (!itemFromDB) {
        return 0;
      }
      let temp = JSON.parse(JSON.stringify(itemFromDB));
      self._id = temp._id;
      self.name = temp.name;
      self.email = temp.email;
      self.photo = temp.photo;
    },
    updateUser(user: UserSnapInType & {id: string}) {
      self._id = user.id;
      self.name = user.name;
      self.email = user.email;
      self.photo = user.photo;

      updateUserToDB(user);
    },
    removeUser() {
      self._id = '';
      self.name = '';
      self.email = '';
      self.photo = '';

      clearUserFromDB();
    },
    toggleSecurityStatus(status: boolean) {
      self.isSecure = status;
    },
    toggleUnlocked(status: boolean) {
      self.isUnlocked = status;
    },
  }));

export default User;
