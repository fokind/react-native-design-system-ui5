import React from 'react';
import { ViewStyle, StyleProp } from 'react-native';

interface IconProps {
  style?: StyleProp<ViewStyle>,
  iconSet?: string,
  glyph?: string,
  size?: string,
}

export const Icon: React.FC<IconProps>;
