import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment';
import CalendarNavigation from './_CalendarNavigation';
import CalendarMonths from './_CalendarMonths';
import CalendarItem from './_CalendarItem';
import CalendarItemSideHelper from './_CalendarItemSideHelper';
import { resolveFormat } from '../util/dateUtils';

const handlePrevious = () => {
  console.log('handlePrevious'); // TODO:
};

const handleNext = () => {
  console.log('handleNext'); // TODO:
};

const isWeekend = date => {
  return [0, 6].includes(date.day());
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
          <CalendarItemSideHelper>{value}</CalendarItemSideHelper>
        </Col>
      ))}
    </Row>
  );
};

const generateDays = ({
  currentDateDisplayed,
  weekdayStart,
  selectedDate,
  onDayPress,
}) => {
  const todayDate = moment().startOf('day');
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
              <CalendarItem
                otherMonth={!d.isSame(currentDateDisplayed, 'month')}
                current={todayDate.isSame(d)}
                isWeekend={isWeekend(d)}
                isActive={selectedDate && selectedDate.isSame(d)}
                onPressIn={() => onDayPress(moment(d))}>
                {d.date().toString()}
              </CalendarItem>
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
};

const Calendar = props => {
  const [selectedDate, setSelectedDate] = useState();
  const [showMonths, setShowMonths] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const today = moment().startOf('day');
  const [currentDateDisplayed, setCurrentDateDisplayed] = useState(
    props.openToDate ? moment(props.openToDate, format) : today,
  );

  const format = resolveFormat({
    dateFormat: props.dateFormat,
    locale: props.locale,
  });

  const onMonthPress = month => {
    const newDate = moment(currentDateDisplayed)
      .locale(props.locale)
      .month(month);

    setCurrentDateDisplayed(newDate);
    setShowMonths(false);
  };

  const onDayPress = day => {
    setSelectedDate(day);
    props.onChange && props.onChange(day);
  };

  return (
    <View
      {...props}
      style={StyleSheet.flatten([styles.container, props.style])}>
      <CalendarNavigation
        locale={props.locale}
        currentDateDisplayed={currentDateDisplayed}
        onNextPress={handleNext}
        onPrevPress={handlePrevious}
        onMonthPress={() => setShowMonths(!showMonths)}
        onYearPress={() => setShowYears(!showYears)}
      />
      {showMonths && (
        <CalendarMonths
          currentMonth={
            today.year() === currentDateDisplayed.year() && today.month()
          }
          locale={props.locale}
          onPress={onMonthPress}
        />
      )}
      {!showMonths &&
        !showYears &&
        generateWeekdays({
          locale: props.locale,
          weekdayStart: props.weekdayStart,
        })}
      {!showMonths &&
        !showYears &&
        generateDays({
          locale: props.locale,
          currentDateDisplayed,
          selectedDate,
          onDayPress,
        })}
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
  /**
   * Callback function when the date selection changes.
   *
   *  * If `enableRangeSelection` is **false** the function is called when any date is selected, with a Moment.js date object
   *  * If `enableRangeSelection` is **true** the function is called when any date is selected, with an array of Moment.js date objects. The max size of this array is 2 i.e. the start and end date.
   *
   * @param {(Moment | Moment[])} date single Moment.js date object if range selection is disabled, else an array containing 2 Moment.js date objects.
   * @param {Boolean} todayPressed - is true only if the change was caused by the today button.
   * @returns {void}
   */
  onChange: PropTypes.func,
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
