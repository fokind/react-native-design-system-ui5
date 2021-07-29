import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Col, Row, Grid } from 'react-native-easy-grid';
import CalendarItem from './_CalendarItem';

const CalendarYears = props => {
  const rows = [0, 1, 2];
  const cols = [0, 1, 2, 3];
  const currentYearDisplayed = props.currentDateDisplayed.year();
  const todayYear = moment().year();

  return (
    <Grid>
      {rows.map(row => (
        <Row key={row}>
          {cols.map(col => (
            <Col key={col}>
              <CalendarItem
                current={todayYear === currentYearDisplayed + col + row * 4}
                onPress={() =>
                  props.onPress(currentYearDisplayed + col + row * 4)
                }>
                {'' + (currentYearDisplayed + col + row * 4)}
              </CalendarItem>
            </Col>
          ))}
        </Row>
      ))}
    </Grid>
  );
};

CalendarYears.displayName = 'CalendarYears';

CalendarYears.propTypes = {
  currentDateDisplayed: PropTypes.instanceOf(moment).isRequired,
  onPress: PropTypes.func.isRequired,
};

export default CalendarYears;
