import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';

const FormLabel = props => {
  return (
    <Text style={StyleSheet.flatten([styles.text, props.style])}>
      {props.children}
    </Text>
  );
};

FormLabel.propTypes = {
  /**  To override default style */
  style: PropTypes.object,
  /**  Text to render within the component */
  children: PropTypes.string,
};

FormLabel.defaultProps = {
  children: '',
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    lineHeight: 19.6,
    color: 'rgb(106, 109, 112)',
    fontFamily: '"72", "72full", Arial, Helvetica, sans-serif',
    fontWeight: '400',
    marginRight: 8,
    numberOfLines: 1,
  },
});

export default FormLabel;
