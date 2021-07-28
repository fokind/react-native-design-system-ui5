import React, { useState } from 'react';
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
  const [isSelected, setIsSelected] = useState(false);

  return (
    <TouchableOpacity
      {...props}
      style={StyleSheet.flatten([
        getItemStyle({
          theme,
          isActive: isSelected,
          otherMonth: props.otherMonth,
          current: props.current,
          isWeekend: props.isWeekend,
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

CalendarItem.displayName = 'CalendarItem';

CalendarItem.propTypes = {
  /**  To override default style */
  style: PropTypes.object,
  /**  To override default text style */
  textStyle: PropTypes.object,
  /**  Pass button text as children as children */
  children: PropTypes.string,
  otherMonth: PropTypes.bool,
  current: PropTypes.bool,
  isWeekend: PropTypes.bool,
};

export default CalendarItem;
