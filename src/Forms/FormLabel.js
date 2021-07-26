import React from 'react';
import { StyleSheet, Text } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeContext } from '../util/ThemeProvider';

const getTextStyle = ({ theme }) => {
  const { fontFamily, fontSize, fontWeight, content } = theme.sap_fiori_3; // TODO заменить
  const textStyle = [
    styles.text,
    {
      fontSize,
      color: content.labelColor,
      fontWeight,
      fontFamily,
    },
  ];

  return textStyle;
};

const FormLabel = props => {
  const theme = useThemeContext();

  return (
    <Text
      style={StyleSheet.flatten([getTextStyle({ theme }), props.style])}
      numberOfLines={1}>
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
    lineHeight: 19.6,
    marginRight: 8,
  },
});

export default FormLabel;
