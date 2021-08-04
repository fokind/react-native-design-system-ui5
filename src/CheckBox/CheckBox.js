import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useThemeContext } from '../util/ThemeProvider';
import { FORM_MESSAGE_TYPES } from '../util/constants';
import createStyles from './styles';

const getTextStyle = ({ theme }) => {
  const textStyles = createStyles(theme.sap_fiori_3);
  const textStyle = [textStyles.text];

  return textStyle;
};

const getIconStyle = ({ theme, state }) => {
  const iconStyles = createStyles(theme.sap_fiori_3);
  const iconStyle = [iconStyles.icon];

  switch (state) {
    case 'warning':
      iconStyle.push(iconStyles.iconWarning);
      break;
    case 'error':
      iconStyle.push(iconStyles.iconError);
      break;
    case 'success':
      iconStyle.push(iconStyles.iconSuccess);
      break;
    case 'information':
      iconStyle.push(iconStyles.iconInformation);
      break;
  }

  return iconStyle;
};

const renderIcon = ({ theme, state, checked }) => {
  return (
    <MaterialIcons
      style={StyleSheet.flatten([getIconStyle({ theme, state })])}
      name={checked ? 'check-box' : 'check-box-outline-blank'}
      size={24}
    />
  );
};

const CheckBox = props => {
  const theme = useThemeContext();
  const [checked, setChecked] = useState(!!props.checked);

  const onPress = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    props.onChange && props.onChange(newChecked);
  };

  return (
    <TouchableOpacity {...props} disabled={props.disabled} onPress={onPress}>
      <View style={StyleSheet.flatten([styles.container, props.style])}>
        {renderIcon({
          theme,
          state: props.validationState,
          checked,
        })}
        <Text
          style={StyleSheet.flatten([
            getTextStyle({ theme }),
            props.textStyle,
          ])}>
          {props.children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

CheckBox.displayName = 'CheckBox';

CheckBox.propTypes = {
  /**  To override default style */
  style: PropTypes.object,
  /**  To override default text style */
  textStyle: PropTypes.object,
  /** Node(s) to render within the component */
  children: PropTypes.string.isRequired,
  /** Set to **true** when the checkbox is checked */
  checked: PropTypes.bool,
  /** State of validation: 'error', 'warning', 'information', 'success' */
  validationState: PropTypes.string,
  /**
   * Callback function; triggered when the change event fires on the HTML checkbox `<input>`.
   *
   * @param {Boolean} checkedState - represents the final checked state of the HTML checkbox input.
   * @returns {void}
   */
  onChange: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CheckBox;
