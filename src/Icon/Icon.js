import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeContext } from '../util/ThemeProvider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ICON_SIZES } from '../util/constants';

const mapIconSet = {
  FontAwesome,
};

const Icon = props => {
  const theme = useThemeContext();
  const { textColor } = theme.sap_fiori_3; // TODO заменить

  return React.createElement(mapIconSet[props.iconSet], {
    name: props.glyph,
    size: ICON_SIZES[props.size],
    color: textColor,
    style: props.style,
  });
};

Icon.displayName = 'Icon';

Icon.propTypes = {
  /**  To override default style */
  style: PropTypes.object,
  /** The icon set to include. See the icon page for the list of sets */
  iconSet: PropTypes.string,
  /** The icon to include. See the icon page for the list of icons */
  glyph: PropTypes.string,
  /** Size of the component: 's', 'm', 'l', 'xl' */
  size: PropTypes.oneOf(Object.keys(ICON_SIZES)),
};

Icon.defaultProps = {
  iconSet: 'FontAwesome',
  glyph: 'arrow-down',
  size: '',
};

export default Icon;
