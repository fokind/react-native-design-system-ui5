import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeContext } from '../util/ThemeProvider';
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment';
import Button from '../Button/Button';
import CalendarItem from './_CalendarItem';
import { isDateBetween, isDateEnabled, resolveFormat } from '../util/dateUtils';

const handlePrevious = () => {};
const showMonths = () => {};
const showYears = () => {};
const handleNext = () => {};

const generateNavigation = ({ locale, currentDateDisplayed }) => {
  const months = moment.localeData(locale).months();
  // const previousButtonLabel = showYears ? show12PreviousYears : previousMonth;
  // const nextButtonLabel = showYears ? show12NextYears : nextMonth;
  // const showToday = showToday && !showMonths && !showYears;

  return (
    <Row>
      <Col style={styles.action}>
        <Button
          iconSet="FontAwesome"
          glyph="chevron-left"
          option="transparent"
          onPress={handlePrevious}
        />
      </Col>
      <Col style={styles.action}>
        <Button option="transparent" onPress={showMonths}>
          {months[currentDateDisplayed.month()]}
        </Button>
      </Col>
      <Col style={styles.action}>
        <Button option="transparent" onPress={showYears}>
          {'' + currentDateDisplayed.year()}
        </Button>
      </Col>
      <Col style={styles.action}>
        <Button
          iconSet="FontAwesome"
          glyph="chevron-right"
          option="transparent"
          onPress={handleNext}
        />
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

const normalizedWeekdayStart = weekdayStart => {
  const weekdayStart1 = parseInt(weekdayStart, 10);
  if (!isNaN(weekdayStart1) && weekdayStart1 >= 0 && weekdayStart1 <= 6) {
    return weekdayStart1;
  }
  return 0;
};

const generateWeekdays = ({ locale, weekdayStart }) => {
  const weekDays = [];
  const daysName = moment.localeData(locale).weekdaysMin(); // TODO
  const shiftedDaysName = shiftDays(
    normalizedWeekdayStart(weekdayStart),
    daysName,
  );

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

const generateDays = ({ currentDateDisplayed, weekdayStart }) => {
  const enableRangeSelection = false;
  // const todayDate;

  const firstDayMonth = moment(currentDateDisplayed).startOf('month');
  const firstDayWeekMonth = moment(firstDayMonth)
    .day(0)
    .day(normalizedWeekdayStart(weekdayStart));
  const isAfterFirstDayMonth = moment(firstDayWeekMonth).isAfter(firstDayMonth);

  const rows = [];

  let days = [];
  let day = isAfterFirstDayMonth
    ? firstDayWeekMonth.subtract(7, 'days')
    : firstDayWeekMonth;

  for (let week = 0; week < 6; week++) {
    for (let iterations = 0; iterations < 7; iterations++) {
      // const copyDate = moment(day);
      // const isDisabled = false; // !isDateEnabled(day, this.props);
      // let ariaLabel = copyDate.format(
      //   moment.localeData(locale).longDateFormat('LL'),
      // );
      // const specialDayType = specialDayType(day);
      // if (isDisabled) {
      //   ariaLabel += ' ' + moment.localeData(locale).invalidDate();
      // }

      days.push(day);
      day = moment(day).add(1, 'days');
    }

    rows.push(days);
    days = [];
  }
  return (
    <>
      {rows.map((r, i) => (
        <Row key={i}>
          {r.map((d, k) => (
            <Col key={k}>
              <CalendarItem otherMonth={!d.isSame(currentDateDisplayed, 'month')}>{d.date().toString()}</CalendarItem>
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
};

const Calendar = props => {
  const theme = useThemeContext();
  const format = resolveFormat({
    dateFormat: props.dateFormat,
    locale: props.locale,
  });
  let currentDateDisplayed = props.openToDate
    ? moment(props.openToDate, format)
    : moment().startOf('day');

  return (
    <View
      {...props}
      style={StyleSheet.flatten([styles.container, props.style])}>
      <Grid>
        {generateNavigation({ locale: props.locale, currentDateDisplayed })}
        {generateWeekdays({
          locale: props.locale,
          weekdayStart: props.weekdayStart,
        })}
        {generateDays({ locale: props.locale, currentDateDisplayed })}
      </Grid>
    </View>
  );
};

Calendar.displayName = 'Calendar';

// Don't move this to customPropTypes because instanceOf(moment) might leak the moment package into a bundle
// when tree-shaking could have safely removed it
export const datePropType = PropTypes.oneOfType([
  PropTypes.instanceOf(moment),
  PropTypes.instanceOf(Date),
  PropTypes.string,
  PropTypes.number,
]);

Calendar.propTypes = {
  /**  To override default style */
  style: PropTypes.object,
  /** Format to use for displaying the inputted or selected date. E.g. "YYYY.M.D", "DD-MM-YYYY", "MM/DD/YYYY" etc. This overrides the date format derived from any set locale. */
  dateFormat: PropTypes.string,
  /**  Moment.js locale keys */
  locale: PropTypes.string,
  /** Date to focus when the calendar is loaded and no date is selected */
  openToDate: datePropType,
  /** Number to indicate which day the week should start. 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday */
  weekdayStart: PropTypes.number,
};

Calendar.defaultProps = {
  locale: 'ru',
  weekdayStart: 0,
};

const styles = StyleSheet.create({
  navigation: {
    flexDirection: 'row',
  },
  container: {},
});

export default Calendar;
