import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';

interface FormItemProps {
  style?: StyleProp<ViewStyle>;
  isHorizontal?: boolean;
}

export const FormItem: React.FC<FormItemProps>;
