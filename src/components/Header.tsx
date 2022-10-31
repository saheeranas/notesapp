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
  <Icon style={styles.icon} name="arrow-back" fill="#000" />
);

const KebabIcon = () => (
  <Icon style={styles.icon} name="more-vertical-outline" fill="#000" />
);

const Header: React.FC<HeaderType> = ({
  title = '',
  navigation,
  hideBack = false,
  style,
  onPressMenu,
}) => {
  const BackAction = () => (
    <TopNavigationAction
      icon={BackIcon}
      onPress={() => navigation.goBack()}
      testID="back_button"
    />
  );

  const MenuButton = () => (
    <TopNavigationAction
      icon={KebabIcon}
      onPress={() => {
        onPressMenu && onPressMenu();
      }}
      testID="kebab_button"
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
  icon: {width: 20, height: 20},
});

export default Header;
