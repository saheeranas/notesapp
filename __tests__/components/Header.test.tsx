import 'react-native';
import React from 'react';
import {render, fireEvent} from '../../src/utils/test-utils';

import Header from '../../src/components/Header';

it('renders Header', () => {
  const tree = render(<Header />, {}).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders with a title', () => {
  const {getByText} = render(<Header title="Home" />, {});

  expect(getByText('Home')).toBeTruthy();
});

it('shows back button', () => {
  const {getByTestId} = render(<Header />, {});

  expect(getByTestId('back_button')).toBeVisible();
});

it('shows kebab menu button', () => {
  const onMockPressMenu = jest.fn();
  const {getByTestId} = render(<Header onPressMenu={onMockPressMenu} />, {});

  expect(getByTestId('kebab_button')).toBeVisible();
});

it('fires kebab menu button', () => {
  const onMockPressMenu = jest.fn();
  const {getByTestId} = render(<Header onPressMenu={onMockPressMenu} />, {});

  const menuBtn = getByTestId('kebab_button');
  fireEvent.press(menuBtn);
  expect(onMockPressMenu).toHaveBeenCalledTimes(1);
});
