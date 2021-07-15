// Type definitions for react-native-design-system
// Project: https://github.com/iamshadmirza/react-native-design-system
// Definitions by:
// Bhavesh Daswani <https://github.com/bhaveshdaswani93>
// TypeScript Version: 3.7.5

import * as React from 'react';
import { themeType } from './types/theme';
import { colorsType } from './types/colors-type';
export * from './types/Button';

export let theme:themeType;
export let colors:colorsType;


export const ThemeProvider: React.FC<{
    value:themeType
}>;
