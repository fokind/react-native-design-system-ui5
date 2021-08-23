import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Col, Row, Grid } from 'react-native-easy-grid';
import CalendarItemSideHelper from './_CalendarItemSideHelper';

const CalendarWeekdays = props => {
  moment.locale(props.locale);
  const weekDays = moment.weekdaysMin(true);

  return (
    <Grid>
      <Row>
        {weekDays.map((value, index) => (
          <Col key={index}>
            <CalendarItemSideHelper>{value}</CalendarItemSideHelper>
          </Col>
        ))}
      </Row>
    </Grid>
  );
};

CalendarWeekdays.displayName = 'CalendarWeekdays';

CalendarWeekdays.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default CalendarWeekdays;
