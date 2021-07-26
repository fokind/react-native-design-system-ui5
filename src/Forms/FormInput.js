import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeContext } from '../util/ThemeProvider';

const testIsEmpty = value => value === undefined || value?.length === 0;

const getInputStyle = ({ isEmpty, theme }) => {
  const { fontFamily, fontSize, field } = theme.sap_fiori_3; // TODO заменить
  const {
    textColor,
    background,
    borderWidth,
    borderColor,
    borderCornerRadius,
  } = field;
  const inputStyle = [
    styles.input,
    {
      color: textColor,
      backgroundColor: background,
      borderWidth,
      borderColor,
      borderRadius: borderCornerRadius,
      fontSize,
      fontFamily,
    },
  ];

  inputStyle.push({
    fontStyle: isEmpty ? 'italic' : 'normal',
  });

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

const styles = StyleSheet.create({
  input: {
    marginVertical: 4,
    lineHeight: 19.6,
    fontWeight: '400',
    height: 36,
    paddingHorizontal: 10,
    minWidth: 44,
  },
});

export default FormInput;
