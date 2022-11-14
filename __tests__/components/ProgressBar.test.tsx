import 'react-native';
import React from 'react';
import {render} from '../../src/utils/test-utils';

import ProgressBar from '../../src/components/ProgressBar';

it('renders ProgressBar with default color', () => {
  const tree = render(<ProgressBar />, {}).toJSON();
  expect(tree).toMatchSnapshot();
});
