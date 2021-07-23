import React from 'react';
import { TextStyle, StyleProp } from 'react-native';

interface FormLabelProps {
  style?: StyleProp<TextStyle>;
  placeholder?: string;
  value?: string;
}

export const FormLabel: React.FC<FormLabelProps>;
