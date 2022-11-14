import 'react-native';
import React from 'react';
import {render, fireEvent} from '../../src/utils/test-utils';

import FAB from '../../src/components/FAB';

it('renders EntryCard without desc', () => {
  let onPressMock = jest.fn();
  const tree = render(<FAB onPress={onPressMock} />, {}).toJSON();
  expect(tree).toMatchSnapshot();
});

it('onPress fires', () => {
  let onPressMock = jest.fn();
  const {getByTestId} = render(<FAB onPress={onPressMock} />, {});

  fireEvent.press(getByTestId('fab_button'));
  expect(onPressMock).toHaveBeenCalledTimes(1);
});
