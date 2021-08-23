import React from 'react';
import { ViewStyle, TextStyle, StyleProp } from 'react-native';

interface CounterProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: string | number;
}

export const Counter: React.FC<CounterProps>;
