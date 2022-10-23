import React from 'react';
import {StyleSheet} from 'react-native';
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

const KebabIcon = () => (
  <Icon
    style={{width: 20, height: 20}}
    name="more-vertical-outline"
    fill="#000"
  />
);

const Header: React.FC<HeaderType> = ({
  title = 'Diary',
  navigation,
  hideBack = false,
  style,
  onPressMenu,
}) => {
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );

  const MenuButton = () => (
    <TopNavigationAction
      icon={KebabIcon}
      onPress={() => {
        onPressMenu && onPressMenu();
      }}
    />
  );

  const Title = () => <Text category="s1">{title}</Text>;

  return (
    <TopNavigation
      accessoryLeft={hideBack ? undefined : BackAction}
      accessoryRight={onPressMenu ? MenuButton : undefined}
      title={Title}
      alignment="center"
      style={[styles.header, style]}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'transparent',
  },
});

export default Header;
