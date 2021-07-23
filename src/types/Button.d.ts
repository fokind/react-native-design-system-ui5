import React from 'react';
import { ViewStyle, TextStyle, StyleProp } from 'react-native';

interface ButtonProps {
    style?: StyleProp<ViewStyle>,
    textStyle?: StyleProp<TextStyle>,
    children?: string,
    onPress: () => void,
    disabled?: boolean,
}

export const Button: React.FC<ButtonProps>;
