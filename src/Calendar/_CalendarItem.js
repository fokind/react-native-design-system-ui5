import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeContext } from '../util/ThemeProvider';
import createStyles from './styles';

const getItemStyle = ({ theme, isActive, otherMonth }) => {
  const itemStyles = createStyles(theme.sap_fiori_3);
  const itemStyle = [itemStyles.item];

  if (otherMonth) {
    itemStyle.push(itemStyles.itemOtherMonth);
  }

  if (isActive) {
    itemStyle.push(itemStyles.itemActive);
  }

  return itemStyle;
};

const getTextStyle = ({ theme, isActive }) => {
  const textStyles = createStyles(theme.sap_fiori_3);
  const textStyle = [textStyles.text];

  if (isActive) {
    textStyle.push(textStyles.textActive);
  }

  return textStyle;
};

const CalendarItem = props => {
  const theme = useThemeContext();
  const [isSelected, setIsSelected] = useState(false);

  return (
    <TouchableOpacity
      {...props}
      style={StyleSheet.flatten([
        getItemStyle({
          theme,
          isActive: isSelected,
          otherMonth: props.otherMonth,
        }),
        props.style,
      ])}
      onPress={() => setIsSelected(true)}>
      <Text
        style={StyleSheet.flatten([
          getTextStyle({ theme, isActive: isSelected }),
          props.textStyle,
        ])}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

CalendarItem.propTypes = {
  /**  To override default style */
  style: PropTypes.object,
  /**  To override default text style */
  textStyle: PropTypes.object,
  /**  Pass button text as children as children */
  children: PropTypes.string,
  otherMonth: PropTypes.bool,
};

export default CalendarItem;
