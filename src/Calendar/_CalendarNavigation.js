import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Button from '../Button/Button';

const CalendarNavigation = props => {
  const months = moment.localeData(props.locale).months();

  return (
    <Grid>
      <Row>
        <Col>
          <Button
            iconSet="FontAwesome"
            glyph="chevron-left"
            option="transparent"
            onPress={props.onPrevPress}
          />
        </Col>
        <Col>
          <Button option="transparent" onPress={props.onMonthPress}>
            {months[props.currentDateDisplayed.month()]}
          </Button>
        </Col>
        <Col>
          <Button option="transparent" onPress={props.onYearPress}>
            {'' + props.currentDateDisplayed.year()}
          </Button>
        </Col>
        <Col>
          <Button
            iconSet="FontAwesome"
            glyph="chevron-right"
            option="transparent"
            onPress={props.onNextPress}
          />
        </Col>
      </Row>
    </Grid>
  );
};

CalendarNavigation.displayName = 'CalendarNavigation';

CalendarNavigation.propTypes = {
  locale: PropTypes.string.isRequired,
  currentDateDisplayed: PropTypes.instanceOf(moment).isRequired,
  onNextPress: PropTypes.func.isRequired,
  onPrevPress: PropTypes.func.isRequired,
  onMonthPress: PropTypes.func.isRequired,
  onYearPress: PropTypes.func.isRequired,
};

export default CalendarNavigation;
