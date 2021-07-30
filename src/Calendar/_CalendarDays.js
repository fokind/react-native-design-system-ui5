import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Col, Row } from 'react-native-easy-grid';
import CalendarItem from './_CalendarItem';

const isWeekend = date => {
  return date.isoWeekday() > 5;
};

const CalendarDays = props => {
  const todayDate = moment().startOf('day');
  const firstDayMonth = moment(props.currentDateDisplayed).startOf('month');
  const firstDayWeekMonth = moment(firstDayMonth).locale(props.locale).startOf('week');
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
                otherMonth={!d.isSame(props.currentDateDisplayed, 'month')}
                current={todayDate.isSame(d)}
                isWeekend={isWeekend(d)}
                isActive={props.selectedDate && props.selectedDate.isSame(d)}
                onPressIn={() => props.onDayPress(moment(d))}>
                {d.date().toString()}
              </CalendarItem>
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
};

CalendarDays.displayName = 'CalendarDays';

CalendarDays.propTypes = {
  locale: PropTypes.string.isRequired,
  currentDateDisplayed: PropTypes.instanceOf(moment).isRequired,
  selectedDate: PropTypes.instanceOf(moment),
  onDayPress: PropTypes.func.isRequired,
};

export default CalendarDays;
