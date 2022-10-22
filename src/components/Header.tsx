import React from 'react';
import {Pressable} from 'react-native';
import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  Text,
} from '@ui-kitten/components';

import {HeaderType} from '../types/types';

const BackIcon = () => (
  <Icon style={{width: 20, height: 20}} name="arrow-back" fill="#000" />
);

const Header: React.FC<HeaderType> = ({
  title = 'Diary',
  navigation,
  hideBack = false,
  style,
}) => {
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );

  const Title = () => <Text category="s1">{title}</Text>;

  return (
    <TopNavigation
      accessoryLeft={hideBack ? undefined : BackAction}
      title={Title}
      alignment="center"
      style={style}
    />
  );
};

export default Header;
