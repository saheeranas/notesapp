import 'react-native';
import React from 'react';
import {render, fireEvent} from '../../src/utils/test-utils';

import EntryCard from '../../src/components/EntryCard';

const data = {
  _id: 'someid',
  desc: 'This is a sample description',
  modifiedAt: 1637330913,
};

it('renders EntryCard without desc', () => {
  const tree = render(<EntryCard modifiedAt={data.modifiedAt} />, {}).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders EntryCard with desc', () => {
  const {getAllByText} = render(
    <EntryCard desc={data.desc} modifiedAt={data.modifiedAt} />,
    {},
  );

  getAllByText(data.desc);
});

it('onPress fires', () => {
  let onPressMock = jest.fn();
  const {getByText} = render(
    <EntryCard
      desc={data.desc}
      modifiedAt={data.modifiedAt}
      onPress={onPressMock}
    />,
    {},
  );

  fireEvent.press(getByText(data.desc));
  expect(onPressMock).toHaveBeenCalledTimes(1);
});
