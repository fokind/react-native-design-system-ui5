import React from 'react';
import { TextStyle, StyleProp } from 'react-native';

interface FormInputProps {
  style?: StyleProp<TextStyle>;
  placeholder?: string;
  value?: string;
}

export const FormInput: React.FC<FormInputProps>;
