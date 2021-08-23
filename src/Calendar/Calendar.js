import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import CalendarNavigation from './_CalendarNavigation';
import CalendarDays from './_CalendarDays';
import CalendarMonths from './_CalendarMonths';
import CalendarYears from './_CalendarYears';
import CalendarWeekdays from './_CalendarWeekdays';

const Calendar = props => {
  const [selectedDate, setSelectedDate] = useState();
  const [showMonths, setShowMonths] = useState(false);
  const [showYears, setShowYears] = useState(false);
  const today = moment().startOf('day');
  const [currentDateDisplayed, setCurrentDateDisplayed] = useState(today);

  const handlePrevious = () => {
    setCurrentDateDisplayed(
      showYears
        ? moment(currentDateDisplayed).add(-12, 'year')
        : moment(currentDateDisplayed).add(-1, 'month'),
    );
  };

  const handleNext = () => {
    setCurrentDateDisplayed(
      showYears
        ? moment(currentDateDisplayed).add(12, 'year')
        : moment(currentDateDisplayed).add(1, 'month'),
    );
  };

  const onMonthPress = month => {
    const newDate = moment(currentDateDisplayed)
      .locale(props.locale)
      .month(month);

    setCurrentDateDisplayed(newDate);
    setShowMonths(false);
  };

  const onYearPress = year => {
    const newDate = moment(currentDateDisplayed)
      .locale(props.locale)
      .year(year);

    setCurrentDateDisplayed(newDate);
    setShowYears(false);
  };

  const onDayPress = day => {
    setSelectedDate(day);
    props.onChange && props.onChange(day);
  };

  return (
    <View
      {...props}
      style={StyleSheet.flatten([props.style])}>
      <CalendarNavigation
        locale={props.locale}
        currentDateDisplayed={currentDateDisplayed}
        onNextPress={handleNext}
        onPrevPress={handlePrevious}
        onMonthPress={() => {
          setShowYears(false);
          setShowMonths(!showMonths);
        }}
        onYearPress={() => {
          setShowMonths(false);
          setShowYears(!showYears);
        }}
      />
      {showMonths && (
        <CalendarMonths
          currentDateDisplayed={currentDateDisplayed}
          locale={props.locale}
          onPress={onMonthPress}
        />
      )}
      {showYears && (
        <CalendarYears
          currentDateDisplayed={currentDateDisplayed}
          onPress={onYearPress}
        />
      )}
      {!showMonths && !showYears && <CalendarWeekdays locale={props.locale} />}
      {!showMonths && !showYears && (
        <CalendarDays
          locale={props.locale}
          currentDateDisplayed={currentDateDisplayed}
          selectedDate={selectedDate}
          onDayPress={onDayPress}
        />
      )}
    </View>
  );
};

Calendar.displayName = 'Calendar';

Calendar.propTypes = {
  /**  To override default style */
  style: PropTypes.object,
  /**  Moment.js locale keys */
  locale: PropTypes.string,
  /**
   * Callback function when the date selection changes. The function is called when any date is selected, with a Moment.js date object
   *
   * @param {Moment} date single Moment.js date object if range selection is disabled, else an array containing 2 Moment.js date objects.
   * @returns {void}
   */
  onChange: PropTypes.func,
};

Calendar.defaultProps = {
  locale: 'en',
};

export default Calendar;
