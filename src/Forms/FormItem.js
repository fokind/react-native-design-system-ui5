import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const getContainerStyle = isHorizontal => {
  const containerStyle = [];
  containerStyle.push({
    flexDirection: isHorizontal ? 'row' : 'column',
  });
  return containerStyle;
};

const FormItem = props => {
  return (
    <View
      {...props}
      style={StyleSheet.flatten([
        getContainerStyle(props.isHorizontal),
        props.style,
      ])}>
      {props.children}
    </View>
  );
};

FormItem.propTypes = {
  /**  To override default style */
  style: PropTypes.object,
  /** Set to **true** to display items in a row */
  isHorizontal: PropTypes.bool,
};

FormItem.defaultProps = {
  isHorizontal: false,
};

export default FormItem;
