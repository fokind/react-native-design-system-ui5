import React from 'react';
import { ViewStyle, TextStyle, StyleProp } from 'react-native';

interface ListItemProps {
  style?: StyleProp<ViewStyle>,
  textStyle?: StyleProp<TextStyle>,
  children: string,
  onPress?: () => void,
}

export const ListItem: React.FC<ListItemProps>;
