import React, { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import PropTypes from 'prop-types';

const testIsEmpty = value => value === undefined || value?.length === 0;

const getInputStyle = ({ isEmpty }) => {
  const inputStyle = [styles.input];
  inputStyle.push({
    fontStyle: isEmpty ? 'italic' : 'normal',
  });
  return inputStyle;
};

const FormInput = props => {
  const [isEmpty, setIsEmpty] = useState(testIsEmpty(props.value));

  return (
    <TextInput
      style={StyleSheet.flatten([getInputStyle({ isEmpty }), props.style])}
      placeholder={props.placeholder}
      onChangeText={event => setIsEmpty(testIsEmpty(event))}
    />
  );
};

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
    backgroundColor: 'white',
    borderColor: 'rgb(137, 145, 154)',
    borderWidth: 1,
    marginVertical: 4,
    fontSize: 14,
    lineHeight: 19.6,
    color: '#32363a',
    fontFamily: '"72", "72full", Arial, Helvetica, sans-serif',
    fontWeight: '400',
    height: 36,
    paddingHorizontal: 10,
    minWidth: 44,
  },
});

export default FormInput;
