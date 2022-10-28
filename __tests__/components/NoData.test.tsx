import 'react-native';
import React from 'react';
import {render} from '../../src/utils/test-utils';

import NoData from '../../src/components/NoData';

it('renders NoData without any custom text', () => {
  const tree = render(<NoData />, {}).toJSON();
  expect(tree).toMatchSnapshot();
});

it("should show message 'There is nothing to show'", () => {
  let {getByText} = render(<NoData title="There is nothing to show" />, {});
  getByText('There is nothing to show');
});
