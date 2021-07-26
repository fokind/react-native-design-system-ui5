import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeContext } from '../util/ThemeProvider';

const getContainerStyle = ({ theme }) => {
  const {
    background,
    borderColor,
    borderWidth,
    borderCornerRadius,
  } = theme.sap_fiori_3.button; // TODO заменить
  const containerStyle = [
    styles.container,
    {
      backgroundColor: background,
      borderColor,
      borderWidth,
      borderRadius: borderCornerRadius,
    },
  ];

  return containerStyle;
};

const getTextStyle = ({ theme }) => {
  const { button, fontFamily, fontSize, fontWeight } = theme.sap_fiori_3; // TODO заменить
  const textStyle = [
    styles.text,
    {
      fontSize,
      color: button.textColor,
      fontWeight,
      fontFamily,
    },
  ];

  return textStyle;
};

const renderChildren = props => {
  const { theme } = props;

  return (
    <Text
      style={StyleSheet.flatten([getTextStyle({ theme }), props.textStyle])}>
      {props.children}
    </Text>
  );
};

const Button = props => {
  const theme = useThemeContext();

  return (
    <TouchableOpacity
      {...props}
      onPress={props.onPress}
      disabled={props.disabled}
      style={StyleSheet.flatten([getContainerStyle({ theme }), props.style])}>
      {renderChildren({ ...props, theme })}
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
    lineHeight: 19.6,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 9,
    height: 36,
    borderStyle: 'solid',
  },
});

export default Button;
