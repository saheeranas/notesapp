import 'react-native';
import React from 'react';
import {render, fireEvent} from '../../src/utils/test-utils';

import {SettingsMenuItem} from '../../src/components/SettingsMenu';

it('renders SettingsMenuItem', () => {
  const tree = render(<SettingsMenuItem label="" />, {}).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with a label', () => {
  const {getByText} = render(<SettingsMenuItem label="Dummy label" />, {});

  getByText('Dummy label');
});

it('renders with an icon', () => {
  const {getByTestId} = render(
    <SettingsMenuItem label="Dummy label" icon="star-outline" />,
    {},
  );

  expect(getByTestId('menu_icon')).toBeVisible();
});

it('onPress fires menu item which have no children', () => {
  let onPressMock = jest.fn();
  const {getByText} = render(
    <SettingsMenuItem label="Dummy label" onPress={onPressMock} />,
    {},
  );

  fireEvent.press(getByText('Dummy label'));
  expect(onPressMock).toHaveBeenCalledTimes(1);
});

// describe('Menu Item with children', () => {
//   it('renders with children', () => {
//     const {getByTestId, getByText} = render(
//       <SettingsMenuItem label="Parent Item">
//         <SettingsMenuItem label="Child 1" />
//         <SettingsMenuItem label="Child 2" />
//       </SettingsMenuItem>,
//       {},
//     );

//     const parent = getByTestId('menuItem');

//     fireEvent.press(parent);

//     expect(getByText('Child 1')).toBeVisible();
//   });
// });
