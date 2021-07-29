import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeContext } from '../util/ThemeProvider';
import createStyles from './styles';

const getContainerStyle = ({ theme }) => {
  const containerStyles = createStyles(theme.sap_fiori_3);
  const containerStyle = [containerStyles.item, containerStyles.itemSideHelper];

  return containerStyle;
};

const getTextStyle = ({ theme }) => {
  const textStyles = createStyles(theme.sap_fiori_3);
  const textStyle = [textStyles.text, textStyles.itemSideHelperText];

  return textStyle;
};

const CalendarItemSideHelper = props => {
  const theme = useThemeContext();

  return (
    <View
      {...props}
      style={StyleSheet.flatten([
        getContainerStyle({
          theme,
        }),
      ])}>
      <Text style={StyleSheet.flatten([getTextStyle({ theme })])}>
        {props.children}
      </Text>
    </View>
  );
};

CalendarItemSideHelper.displayName = 'CalendarItemSideHelper';

CalendarItemSideHelper.propTypes = {
  children: PropTypes.string.isRequired,
};

export default CalendarItemSideHelper;
