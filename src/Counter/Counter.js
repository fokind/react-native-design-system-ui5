import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeContext } from '../util/ThemeProvider';
import createStyles from './styles';

const getContainerStyle = theme => {
  const containerStyles = createStyles(theme.sap_fiori_3);
  const containerStyle = [containerStyles.container];

  return containerStyle;
};

const getTextStyle = theme => {
  const textStyles = createStyles(theme.sap_fiori_3);
  const textStyle = [textStyles.text];

  return textStyle;
};

const Counter = ({ children, style, textStyle }) => {
  const theme = useThemeContext();

  return (
    <View style={StyleSheet.flatten([getContainerStyle(theme), style])}>
      <Text style={StyleSheet.flatten([getTextStyle(theme), textStyle])}>
        {children}
      </Text>
    </View>
  );
};

Counter.propTypes = {
  style: PropTypes.object,
  textStyle: PropTypes.object,
  /** Node(s) to render within the component */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Counter.defaultProps = {
  children: 0,
};

export default Counter;
