import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeContext } from '../util/ThemeProvider';

const getContainerStyle = ({ theme, selected }) => {
  const { button } = theme.sap_fiori_3; // TODO заменить
  const { background, borderColor, borderWidth, borderCornerRadius } = button;
  const containerStyle = [
    styles.container,
    {
      borderWidth,
      borderRadius: borderCornerRadius,
    },
  ];

  containerStyle.push({
    backgroundColor: selected ? button.selected.background : background,
    borderColor: selected ? button.selected.borderColor : borderColor,
  });

  return containerStyle;
};

const getTextStyle = ({ theme, selected }) => {
  const { button, fontFamily, fontSize, fontWeight } = theme.sap_fiori_3; // TODO заменить
  const textStyle = [
    styles.text,
    {
      fontSize,
      fontWeight,
      fontFamily,
    },
  ];

  textStyle.push({
    color: selected ? button.selected.textColor : button.textColor,
  });

  return textStyle;
};

const Button = props => {
  const theme = useThemeContext();
  const [isPressed, setIsPressed] = useState(false);

  return (
    <TouchableOpacity
      {...props}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={props.onPress}
      disabled={props.disabled}
      activeOpacity={1}
      style={StyleSheet.flatten([
        getContainerStyle({ theme, selected: isPressed }),
        props.style,
      ])}>
      <Text
        style={StyleSheet.flatten([
          getTextStyle({ theme, selected: isPressed }),
          props.textStyle,
        ])}>
        {props.children}
      </Text>
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
    opacity: 1,
  },
});

export default Button;
