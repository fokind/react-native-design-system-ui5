import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Col, Row, Grid } from 'react-native-easy-grid';
import CalendarItem from './_CalendarItem';

const CalendarMonths = props => {
  const months = moment.localeData(props.locale).monthsShort();
  const rows = [0, 1, 2];
  const cols = [0, 1, 2, 3];

  return (
    <Grid>
      {rows.map(row => (
        <Row key={row}>
          {cols.map(col => (
            <Col key={col}>
              <CalendarItem
                current={props.currentMonth === col + row * 4}
                onPress={() => props.onPress(col + row * 4)}>
                {months[col + row * 4]}
              </CalendarItem>
            </Col>
          ))}
        </Row>
      ))}
    </Grid>
  );
};

CalendarMonths.displayName = 'CalendarMonths';

CalendarMonths.propTypes = {
  locale: PropTypes.string.isRequired,
  current: PropTypes.number,
  onPress: PropTypes.func.isRequired,
};

export default CalendarMonths;
