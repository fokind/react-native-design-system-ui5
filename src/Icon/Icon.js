import React from 'react';
import PropTypes from 'prop-types';
import { useThemeContext } from '../util/ThemeProvider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import Zocial from 'react-native-vector-icons/Zocial';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { ICON_SIZES } from '../util/constants';

const mapIconSet = {
  AntDesign: AntDesign,
  Entypo: Entypo,
  EvilIcons: EvilIcons,
  Feather: Feather,
  FontAwesome: FontAwesome,
  Fontisto: Fontisto,
  Foundation: Foundation,
  Ionicons: Ionicons,
  MaterialIcons: MaterialIcons,
  MaterialCommunityIcons: MaterialCommunityIcons,
  Octicons: Octicons,
  Zocial: Zocial,
  SimpleLineIcons: SimpleLineIcons,
};

const Icon = props => {
  const theme = useThemeContext();
  const { textColor } = theme.sap_fiori_3; // TODO заменить

  return React.createElement(mapIconSet[props.iconSet], {
    name: props.glyph,
    size: ICON_SIZES[props.size] || 14,
    color: props.color || textColor,
    style: props.style,
  });
};

Icon.displayName = 'Icon';

Icon.propTypes = {
  /**  To override default style */
  style: PropTypes.object,
  /** The icon set to include. See the icon page for the list of sets */
  iconSet: PropTypes.oneOf(Object.keys(mapIconSet)).isRequired,
  /** The icon to include. See the icon page for the list of icons */
  glyph: PropTypes.string.isRequired,
  /** Size of the component: 's', 'm', 'l', 'xl' */
  size: PropTypes.oneOf(Object.keys(ICON_SIZES)),
};

export default Icon;
