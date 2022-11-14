import {types} from 'mobx-state-tree';

const DiaryEntry = types.model('DiaryEntry', {
  // _id: uuid4()
  _id: types.string,
  // desc: Random strings
  desc: types.string,
  // createdAt: UNIX timestamp
  createdAt: types.number,
  // modifiedAt: UNIX timestamp
  modifiedAt: types.number,
  // deleted: boolean
  deleted: types.optional(types.boolean, false),
});

export default DiaryEntry;
