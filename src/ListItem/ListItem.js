import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const ListItem = ({ style, textStyle, subtitleStyle, background, ...props }) => {
  return (
    <TouchableOpacity {...props}>
      <View style={StyleSheet.flatten([styles.container, style])}>
        <Text style={StyleSheet.flatten([styles.text, textStyle])}>
          {props.children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  /**  To override default style */
  style: PropTypes.object,
  /**  To override default text style */
  textStyle: PropTypes.object,
  /**  Pass button text as children as children */
  children: PropTypes.string.isRequired,
  /**  Callback function; triggered when the button is pressed */
  onPress: PropTypes.func.isRequired,
};

ListItem.defaultProps = {
  children: 'Item',
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(228, 228, 228)',
    height: 44,
    paddingHorizontal: 16,
    display: 'flex',
    paddingLeft: 16,
    justifyContent: 'center',
  },
  text: {
    fontSize: 14,
    lineHeight: 19.6,
    color: '#32363a',
    fontFamily: '"72", "72full", Arial, Helvetica, sans-serif',
    fontWeight: '400',
  },
});

export default ListItem;
