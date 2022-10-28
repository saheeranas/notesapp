import {SnapshotIn, SnapshotOut} from 'mobx-state-tree';
import type {StackScreenProps} from '@react-navigation/stack';

// Stores
import DiaryEntry from '../mst/DiaryEntry';
import User from '../mst/User';

/**
 * Header
 */

export interface HeaderType {
  hideBack?: boolean;
  navigation: any;
  title: string;
  style?: any;
  onPressMenu?: () => void;
}

/**
 * Main Stack Navigator
 */

type RootStackParamList = {
  Entries: undefined;
  EntrySingle: {id: string | null};
  Settings: undefined;
};

/**
 * Entries screen
 */

export type EntriesProps = StackScreenProps<RootStackParamList, 'Entries'>;

/**
 * EntrySingle screen
 */

export type EntrySingleProps = StackScreenProps<
  RootStackParamList,
  'EntrySingle'
>;

/**
 * Settings screen
 */

export type SettingsProps = StackScreenProps<RootStackParamList, 'Settings'>;

/**
 * Password screen
 */

export interface PasswordType {
  navigation: any;
}

/**
 * MobX State Tree
 * Derive TS interface from MST Model. So that, no need to declare in two places
 * Refer MST documentation for more details.
 * ( MST Model --> TypeScript interface )
 */
// Entry Incoming Prop
export interface EntrySnapInType extends SnapshotIn<typeof DiaryEntry> {}
// Entry Outgoing Prop
export interface EntrySnapOutType extends SnapshotOut<typeof DiaryEntry> {}

// User Incoming Prop
export interface UserSnapInType extends SnapshotIn<typeof User> {}
// User Outgoing Prop
export interface UserSnapOutType extends SnapshotOut<typeof User> {}
