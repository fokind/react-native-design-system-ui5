import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeContext } from '../util/ThemeProvider';
import { BUTTON_OPTIONS, BUTTON_TYPES } from '../util/constants';
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment';
import Button from '../Button/Button';
import CalendarItem from './_CalendarItem';

const handlePrevious = () => {};
const showMonths = () => {};
const showYears = () => {};
const handleNext = () => {};

const generateNavigation = () => {
  // const months = moment.localeData(locale).months();
  // const previousButtonLabel = showYears ? show12PreviousYears : previousMonth;
  // const nextButtonLabel = showYears ? show12NextYears : nextMonth;
  // const showToday = showToday && !showMonths && !showYears;

  return (
    <Row>
      <Col style={styles.action}>
        <Button option="transparent" onPress={handlePrevious}>
          prev
        </Button>
      </Col>
      <Col style={styles.action}>
        <Button option="transparent" onPress={showMonths}>
          July
        </Button>
      </Col>
      <Col style={styles.action}>
        <Button option="transparent" onPress={showYears}>
          2021
        </Button>
      </Col>
      <Col style={styles.action}>
        <Button option="transparent" onPress={handleNext}>
          next
        </Button>
      </Col>
    </Row>
  );
};

const shiftDays = (startOnDay = 0, weekdays) => {
  const _weekdays = [...weekdays];
  let counter = startOnDay;
  while (counter > 0) {
    const day = _weekdays.shift();
    _weekdays.push(day);
    counter = counter - 1;
  }
  return _weekdays;
};

const normalizedWeekdayStart = (weekdayStart = 0) => {
  const weekdayStart1 = parseInt(weekdayStart, 10);
  if (!isNaN(weekdayStart1) && weekdayStart1 >= 0 && weekdayStart1 <= 6) {
    return weekdayStart1;
  }
  return 0;
};

const generateWeekdays = () => {
  const weekDays = [];
  const daysName = moment.localeData('ru').weekdaysMin(); // TODO
  const shiftedDaysName = shiftDays(normalizedWeekdayStart(), daysName);

  for (let index = 0; index < 7; index++) {
    weekDays.push(shiftedDaysName[index]);
  }

  return (
    <Row>
      {weekDays.map((value, index) => (
        <Col key={index}>
          <Text>{value}</Text>
        </Col>
      ))}
    </Row>
  );
};

const generateDays = tableBodyProps => {
  const enableRangeSelection = false;
  const currentDateDisplayed = '2021-07-27';
  // const todayDate;
  const locale = 'ru';

  const firstDayMonth = moment(currentDateDisplayed).startOf('month');
  const firstDayWeekMonth = moment(firstDayMonth)
    .day(0)
    .day(normalizedWeekdayStart());
  const isAfterFirstDayMonth = moment(firstDayWeekMonth).isAfter(firstDayMonth);

  const rows = [];

  let days = [];
  let day = isAfterFirstDayMonth
    ? firstDayWeekMonth.subtract(7, 'days')
    : firstDayWeekMonth;
  let dateFormatted = '';

  for (let week = 0; week < 6; week++) {
    for (let iterations = 0; iterations < 7; iterations++) {
      dateFormatted = day.date();
      // const copyDate = moment(day);
      // const isDisabled = false; // !isDateEnabled(day, this.props);
      // let ariaLabel = copyDate.format(
      //   moment.localeData(locale).longDateFormat('LL'),
      // );
      // const specialDayType = specialDayType(day);
      // if (isDisabled) {
      //   ariaLabel += ' ' + moment.localeData(locale).invalidDate();
      // }

      days.push(dateFormatted.toString());
      day = moment(day).add(1, 'days');
    }

    rows.push(days);
    days = [];
  }
  return (
    <>
      {rows.map((r, i) => (
        <Row key={i}>
          {r.map((c, k) => (
            <Col key={k}>
              <CalendarItem>{c}</CalendarItem>
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
};

const Calendar = props => {
  const theme = useThemeContext();

  return (
    <View
      {...props}
      style={StyleSheet.flatten([styles.container, props.style])}>
      <Grid>
        {generateNavigation({})}
        {generateWeekdays()}
        {generateDays()}
      </Grid>
    </View>
  );
};

Calendar.propTypes = {
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
  navigation: {
    flexDirection: 'row',
  },
  container: {},
});

export default Calendar;
