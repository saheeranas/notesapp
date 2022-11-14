import 'react-native';
import {View} from 'react-native';
import React from 'react';
import {render} from '../../src/utils/test-utils';

import {Layout} from '../../src/components/Layout';

it('renders Layout', () => {
  const tree = render(<Layout />, {}).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders Layout with children', () => {
  render(
    <Layout>
      <View>
        <View />
      </View>
    </Layout>,
    {},
  );
});
