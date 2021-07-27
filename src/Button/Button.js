import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeContext } from '../util/ThemeProvider';
import { BUTTON_OPTIONS } from '../util/constants';

const getContainerStyle = ({ theme, selected, option, type, disabled }) => {
  const { button } = theme.sap_fiori_3; // TODO заменить
  const { background, borderColor, borderWidth, borderCornerRadius } = button;
  const containerStyle = [
    styles.container,
    {
      backgroundColor: background,
      borderColor: borderColor,
      borderWidth,
      borderRadius: borderCornerRadius,
    },
  ];

  switch (option) {
    case 'emphasized':
      if (selected) {
        containerStyle.push({
          backgroundColor: button.emphasized.active.background,
          borderColor: button.emphasized.active.borderColor,
        });
      } else {
        containerStyle.push({
          backgroundColor: button.emphasized.background,
          borderColor: button.emphasized.borderColor,
        });
      }
      break;
    case 'transparent':
      if (selected) {
        containerStyle.push({
          backgroundColor: button.active.background,
          borderColor: button.selected.borderColor,
        });
      } else {
        containerStyle.push({
          backgroundColor: button.lite.background,
          borderColor: button.lite.borderColor,
        });
      }
      break;
    default:
      if (selected) {
        containerStyle.push({
          backgroundColor: button.active.background,
          borderColor: button.selected.borderColor,
        });
      }
      break;
  }

  switch (type) {
    case 'positive':
      if (selected) {
        containerStyle.push({
          backgroundColor: button.accept.active.background,
          borderColor: button.accept.active.borderColor,
        });
      } else {
        containerStyle.push({
          backgroundColor: button.accept.background,
          borderColor: button.accept.borderColor,
        });
      }
      break;
    case 'negative':
      if (selected) {
        containerStyle.push({
          backgroundColor: button.reject.active.background,
          borderColor: button.reject.active.borderColor,
        });
      } else {
        containerStyle.push({
          backgroundColor: button.reject.background,
          borderColor: button.reject.borderColor,
        });
      }
      break;
  }

  return containerStyle;
};

const getTextStyle = ({ theme, selected, option, type, disabled }) => {
  const { button, fontFamily, fontSize, fontWeight } = theme.sap_fiori_3; // TODO заменить
  const textStyle = [
    styles.text,
    {
      fontSize,
      fontWeight,
      fontFamily,
      color: button.textColor,
    },
  ];

  switch (option) {
    case 'emphasized':
      if (selected) {
        textStyle.push({
          color: button.emphasized.textColor,
        });
      } else {
        textStyle.push({
          color: button.emphasized.textColor,
        });
      }
      break;
    default:
      if (selected) {
        textStyle.push({
          color: button.selected.textColor,
        });
      }
      break;
  }

  switch (type) {
    case 'positive':
      if (selected) {
        textStyle.push({
          color: button.selected.textColor,
        });
      } else {
        textStyle.push({
          color: button.accept.textColor,
        });
      }
      break;
    case 'negative':
      if (selected) {
        textStyle.push({
          color: button.selected.textColor,
        });
      } else {
        textStyle.push({
          color: button.reject.textColor,
        });
      }
      break;
  }

  return textStyle;
};

const Button = props => {
  const theme = useThemeContext();
  const [selected, setSelected] = useState(false);

  return (
    <TouchableOpacity
      {...props}
      onPressIn={() => setSelected(true)}
      onPressOut={() => setSelected(false)}
      onPress={props.onPress}
      disabled={props.disabled}
      activeOpacity={1}
      style={StyleSheet.flatten([
        getContainerStyle({
          theme,
          selected,
          option: props.option,
          type: props.type,
        }),
        props.style,
      ])}>
      <Text
        style={StyleSheet.flatten([
          getTextStyle({
            theme,
            selected,
            option: props.option,
            type: props.type,
          }),
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
  /**  Indicates the importance of the button: 'emphasized' or 'transparent' */
  option: PropTypes.oneOf(BUTTON_OPTIONS),
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
