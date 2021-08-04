import React from 'react';
import { ViewStyle, TextStyle, StyleProp } from 'react-native';

interface CheckBoxProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: string;
  checked?: boolean;
  validationState?: string;
  onChange: () => void;
}

export const CheckBox: React.FC<CheckBoxProps>;
