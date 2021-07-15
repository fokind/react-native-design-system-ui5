import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type TButtonProps = {
  children?: string;
  glyph?: string;
  option?:
  | 'emphasized'
  | 'transparent',
  onPress?: () => void;
};

const Button: React.FunctionComponent<TButtonProps> = props => {
  const styles = StyleSheet.create({
    buttonText: {
      fontSize: 14,
      lineHeight: 19.6,
      color: '#32363a',
      fontWeight: '400',
      fontFamily: '"72", "72full", Arial, Helvetica, sans-serif',
    },
    button: {
      paddingHorizontal: 9,
      textVerticalAlign: 'middle',
      whiteSpace: 'nowrap',
      borderRadius: 4,
      height: 36,
      borderStyle: 'solid',
      borderWidth: 1,
      color: '#0854a0',
      borderColor: '#0854a0',
      backgroundColor: '#fff',
      justifyContent: 'center',
    },
  });

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.button}>
      <Text style={styles.buttonText}>{props.children}</Text>
    </TouchableOpacity>
  );
};

Button.defaultProps = {};

export default Button;
