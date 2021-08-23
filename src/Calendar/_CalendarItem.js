import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeContext } from '../util/ThemeProvider';
import createStyles from './styles';

const getItemStyle = ({ theme, isActive, otherMonth, current, isWeekend }) => {
  const itemStyles = createStyles(theme.sap_fiori_3);
  const itemStyle = [itemStyles.item];

  if (otherMonth) {
    itemStyle.push(itemStyles.itemOtherMonth);
  }

  if (current) {
    itemStyle.push(itemStyles.itemCurrent);
  }

  if (isWeekend) {
    itemStyle.push(itemStyles.itemWeekend);
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

  return (
    <TouchableOpacity
      {...props}
      style={StyleSheet.flatten([
        getItemStyle({
          theme,
          isActive: props.isActive,
          otherMonth: props.otherMonth,
          current: props.current,
          isWeekend: props.isWeekend,
        }),
      ])}
      onPress={props.onPress}>
      <Text
        style={StyleSheet.flatten([
          getTextStyle({ theme, isActive: props.isActive }),
        ])}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

CalendarItem.displayName = 'CalendarItem';

CalendarItem.propTypes = {
  children: PropTypes.string.isRequired,
  otherMonth: PropTypes.bool,
  current: PropTypes.bool,
  isWeekend: PropTypes.bool,
  isActive: PropTypes.bool,
  onPress: PropTypes.func,
};

export default CalendarItem;
