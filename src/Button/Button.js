import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeContext } from '../util/ThemeProvider';
import { BUTTON_OPTIONS, BUTTON_TYPES } from '../util/constants';
import createStyles from './styles';

const getContainerStyle = ({ theme, selected, option, type, disabled }) => {
  const containerStyles = createStyles(theme.sap_fiori_3);
  const { button } = theme.sap_fiori_3; // TODO заменить
  const containerStyle = [containerStyles.container];

  if (disabled) {
    containerStyle.push(containerStyles.containerDisabled);
  }

  switch (option) {
    case 'emphasized':
      containerStyle.push(
        selected
          ? containerStyles.containerEmphasizedPressed
          : containerStyles.containerEmphasized,
      );
      break;
    case 'transparent':
      containerStyle.push(
        selected
          ? containerStyles.containerTransparentPressed
          : containerStyles.containerTransparent,
      );
      break;
    default:
      if (selected) {
        containerStyle.push(containerStyles.containerStandardPressed);
      }
      break;
  }

  switch (type) {
    case 'positive':
      containerStyle.push(
        selected
          ? containerStyles.containerPositivePressed
          : containerStyles.containerPositive,
      );
      break;
    case 'negative':
      containerStyle.push(
        selected
          ? containerStyles.containerNegativePressed
          : containerStyles.containerNegative,
      );
      break;
  }

  return containerStyle;
};

const getTextStyle = ({ theme, selected, option, type }) => {
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
          selected: selected || props.selected,
          option: props.option,
          type: props.type,
          disabled: props.disabled,
        }),
        props.style,
      ])}>
      <Text
        style={StyleSheet.flatten([
          getTextStyle({
            theme,
            selected: selected || props.selected,
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
  /**  Boolean value for disabled button */
  disabled: PropTypes.bool,
  /**  Indicates the importance of the button: 'emphasized' or 'transparent' */
  option: PropTypes.oneOf(BUTTON_OPTIONS),
  /** Set to **true** to set state of the button to "selected" */
  selected: PropTypes.bool,
  /** Sets the variation of the component. Primarily used for styling: 'standard',
  'positive',
  'negative' */
  type: PropTypes.oneOf(BUTTON_TYPES),
  /**  Callback function; triggered when the button is pressed */
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  text: {
    lineHeight: 19.6,
  },
});

export default Button;
