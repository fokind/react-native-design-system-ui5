import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeContext } from '../util/ThemeProvider';
import createStyles from './styles';

const testIsEmpty = value => value === undefined || value?.length === 0;

const getInputStyle = ({ isEmpty, theme }) => {
  const inputStyles = createStyles(theme.sap_fiori_3);
  const inputStyle = [inputStyles.input];

  if (isEmpty) {
    inputStyle.push(inputStyles.inputEmpty);
  }

  return inputStyle;
};

const FormInput = props => {
  const theme = useThemeContext();
  const [isEmpty, setIsEmpty] = useState(testIsEmpty(props.value));

  return (
    <TextInput
      style={StyleSheet.flatten([
        getInputStyle({ isEmpty, theme }),
        props.style,
      ])}
      placeholder={props.placeholder}
      placeholderTextColor={theme.sap_fiori_3.field.placeholderTextColor}
      onChangeText={event => setIsEmpty(testIsEmpty(event))}
    />
  );
};

FormInput.displayName = 'FormInput';

FormInput.propTypes = {
  /**  To override default style */
  style: PropTypes.object,
  /**  To override default text style */
  textStyle: PropTypes.object,
  /**  Pass button text as children as children */
  placeholder: PropTypes.string,
  /**  Pass button text as children as children */
  value: PropTypes.string,
};

FormInput.defaultProps = {
  placeholder: '',
  value: '',
};

export default FormInput;
