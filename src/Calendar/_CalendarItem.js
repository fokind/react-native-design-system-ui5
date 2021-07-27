import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeContext } from '../util/ThemeProvider';
import { BUTTON_OPTIONS, BUTTON_TYPES } from '../util/constants';
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment';
import Button from '../Button/Button';

const getContainerStyle = ({ theme }) => {
  const { legend } = theme.sap_fiori_3; // TODO заменить
  const containerStyle = [
    styles.container,
    {
      backgroundColor: legend.workingBackground,
    },
  ];

  return containerStyle;
};

const CalendarItem = props => {
  const theme = useThemeContext();

  return (
    <View
      {...props}
      style={StyleSheet.flatten([getContainerStyle({ theme }), props.style])}>
      <Text style={StyleSheet.flatten([styles.text, props.textStyle])}>
        {props.children}
      </Text>
    </View>
  );
};

CalendarItem.propTypes = {
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
};

const styles = StyleSheet.create({
  container: {
    height: 44,
    minWidth: 34,
    margin: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {},
});

export default CalendarItem;
