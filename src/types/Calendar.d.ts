import React from 'react';
import { ViewStyle, TextStyle, StyleProp } from 'react-native';

interface CalendarProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: string;
  onPress: () => void;
  disabled?: boolean;
}

export const Calendar: React.FC<CalendarProps>;
