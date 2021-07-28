import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeContext } from '../util/ThemeProvider';
import { BUTTON_OPTIONS, BUTTON_TYPES } from '../util/constants';
import createStyles from './styles';
import Icon from '../Icon/Icon';

const getContainerStyle = ({ theme, selected, option, type, disabled }) => {
  const containerStyles = createStyles(theme.sap_fiori_3);
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

const getTextColorStyle = ({ theme, selected, option, type }) => {
  const textColorStyles = createStyles(theme.sap_fiori_3);
  const textColorStyle = [textColorStyles.textColor];

  switch (option) {
    case 'emphasized':
      textColorStyle.push(textColorStyles.textColorEmphasized);
      break;
    default:
      if (selected) {
        textColorStyle.push(textColorStyles.textColorStandardPressed);
      }
      break;
  }

  switch (type) {
    case 'positive':
      textColorStyle.push(
        selected
          ? textColorStyles.textColorPositivePressed
          : textColorStyles.textColorPositive,
      );
      break;
    case 'negative':
      textColorStyle.push(
        selected
          ? textColorStyles.textColorNegativePressed
          : textColorStyles.textColorNegative,
      );
      break;
  }

  return textColorStyle;
};

const getTextStyle = ({ theme, selected, option, type }) => {
  const textStyles = createStyles(theme.sap_fiori_3);
  const textStyle = [
    textStyles.text,
    getTextColorStyle({ theme, selected, option, type }),
  ];

  return textStyle;
};

const getIconStyle = ({
  theme,
  isBeforeText,
  hasText,
  selected,
  option,
  type,
}) => {
  const iconStyles = createStyles(theme.sap_fiori_3);
  const iconStyle = [getTextColorStyle({ theme, selected, option, type })];

  if (hasText) {
    iconStyle.push(
      isBeforeText ? iconStyles.iconBeforeText : iconStyles.iconAfterText,
    );
  }

  return iconStyle;
};

const renderIcon = ({
  theme,
  iconSet,
  glyph,
  isBeforeText,
  hasText,
  selected,
  option,
  type,
}) => (
  <Icon
    style={StyleSheet.flatten([getIconStyle({
      theme,
      isBeforeText,
      hasText,
      selected,
      option,
      type,
    })])}
    iconSet={iconSet}
    glyph={glyph}
  />
);

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
      {props.iconBeforeText &&
        props.iconSet &&
        props.glyph &&
        renderIcon({
          theme,
          iconSet: props.iconSet,
          glyph: props.glyph,
          hasText: !!props.children,
          iconBeforeText: props.iconBeforeText,
          selected: selected || props.selected,
          option: props.option,
          type: props.type,
        })}
      {props.children && (
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
      )}
      {!props.iconBeforeText &&
        props.iconSet &&
        props.glyph &&
        renderIcon({
          theme,
          iconSet: props.iconSet,
          glyph: props.glyph,
          hasText: !!props.children,
          iconBeforeText: props.iconBeforeText,
          selected: selected || props.selected,
          option: props.option,
          type: props.type,
        })}
    </TouchableOpacity>
  );
};

Button.displayName = 'Button';

Button.propTypes = {
  /**  To override default style */
  style: PropTypes.object,
  /**  To override default text style */
  textStyle: PropTypes.object,
  /**  Pass button text as children as children */
  children: PropTypes.string,
  /**  Boolean value for disabled button */
  disabled: PropTypes.bool,
  /** The icon set to include. See the icon page for the list of sets */
  iconSet: PropTypes.string,
  /** The icon to include. See the icon page for the list of icons */
  glyph: PropTypes.string,
  /** Determines whether the icon should be placed before the text */
  iconBeforeText: PropTypes.bool,
  /**  Indicates the importance of the button: 'emphasized' or 'transparent' */
  option: PropTypes.oneOf(BUTTON_OPTIONS),
  /** Set to **true** to set state of the button to "selected" */
  selected: PropTypes.bool,
  /** Sets the variation of the component. Primarily used for styling: 'standard',
  'positive',
  'negative' */
  type: PropTypes.oneOf(BUTTON_TYPES),
  /**  Callback function; triggered when the button is pressed */
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  text: {
    lineHeight: 19.6,
  },
});

export default Button;
