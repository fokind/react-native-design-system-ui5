import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeContext } from '../util/ThemeProvider';

const renderChildren = (props) => {
  return (
    <>
      <Text style={StyleSheet.flatten([styles.text, props.textStyle])}>
        {props.children}
      </Text>
    </>
  );
};

const Button = (props) => {
  const theme = useThemeContext();
  return (
    <TouchableOpacity
      {...props}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <View style={StyleSheet.flatten([styles.container, props.style])}>
        {renderChildren({ ...props, theme })}
      </View>
    </TouchableOpacity>
  );
};

Button.propTypes = {
  /**  To override default style */
  style: PropTypes.object,
  /**  To override default text style */
  textStyle: PropTypes.object,
  /**  Pass button text as children as children */
  children: PropTypes.string,
  /**  Callback function; triggered when the button is pressed */
  onPress: PropTypes.func.isRequired,
  /**  Boolean value for disabled button */
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  children: '',
  disabled: false,
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    lineHeight: 19.6,
    color: '#32363a',
    fontWeight: '400',
    fontFamily: '"72", "72full", Arial, Helvetica, sans-serif',
  },
  container: {
    left: 0,
    right: 0,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 9,
    textVerticalAlign: 'middle',
    whiteSpace: 'nowrap',
    height: 36,
    borderStyle: 'solid',
    borderWidth: 1,
    color: '#0854a0',
    borderColor: '#0854a0',
    backgroundColor: '#fff',
  },
});

export default Button;
