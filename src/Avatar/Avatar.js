import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import Feather from 'react-native-vector-icons/Feather';
import { useThemeContext } from '../util/ThemeProvider';
import Icon from '../Icon/Icon';
import createStyles from './styles';
// import { AVATAR_SIZES } from '../util/constants';

const AVATAR_SIZES = {
  xs: 32,
  s: 48,
  m: 64,
  l: 80,
  xl: 112,
};
const FONT_SIZES = {
  xs: 16,
  s: 18,
  m: 24,
  l: 36,
  xl: 48,
};

const getContainerStyle = ({ theme, circle, size, transparent }) => {
  const avatarStyle = [styles.container];
  const width = AVATAR_SIZES[size];

  avatarStyle.push({
    // padding: theme.size[size],
    width,
    height: width,
  });

  avatarStyle.push({
    backgroundColor: transparent ? 'transparent' : '#286eb4',
  });

  avatarStyle.push({
    borderRadius: circle ? width / 2 : 4,
  });

  return avatarStyle;
};

const getEditIconStyle = ({ theme, size }) => {
  const iconStyle = [
    styles.editView,
    {
      width: theme.avatarSize[size] / 4,
      height: theme.avatarSize[size] / 4,
      borderRadius: theme.avatarSize[size] / 8,
      backgroundColor: theme.brandColor.disabled,
    },
  ];
  return iconStyle;
};

const getTextStyle = ({ theme, size, transparent }) => {
  const textStyles = createStyles(theme.sap_fiori_3);
  const textStyle = [textStyles.text];
  const fontSize = FONT_SIZES[size];

  textStyle.push({ fontSize });

  if (transparent) {
    textStyle.push({
      color: '#0854a0',
    });
  }

  return textStyle;
};

const getIconStyle = ({ theme, size, transparent }) => {
  const iconStyles = createStyles(theme.sap_fiori_3);
  const iconStyle = [iconStyles.text];
  const fontSize = FONT_SIZES[size];

  iconStyle.push({ fontSize });

  if (transparent) {
    iconStyle.push({
      color: '#0854a0',
    });
  }

  return iconStyle;
};

const Avatar = props => {
  const theme = useThemeContext();
  const TouchableElement =
    Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <View
      style={StyleSheet.flatten([
        styles.propView,
        { width: theme.avatarSize[props.size] },
      ])}>
      <TouchableElement disabled={!props.editable} {...props}>
        <View
          style={StyleSheet.flatten([
            getContainerStyle({ ...props, theme }),
            props.style,
          ])}>
          {props.backgroundImageUrl && (
            <Image
              source={{ uri: props.backgroundImageUrl }}
              resizeMode="cover"
              style={styles.image}
            />
          )}
          {!props.backgroundImageUrl && props.iconSet && props.glyph && (
            <Icon
              style={StyleSheet.flatten([
                getIconStyle({
                  theme,
                  size: props.size,
                  transparent: props.transparent,
                }),
              ])}
              iconSet={props.iconSet}
              glyph={props.glyph}
            />
          )}
          {!props.backgroundImageUrl && !(props.iconSet && props.glyph) && (
            <Text
              numberOfLines={1}
              style={StyleSheet.flatten([
                getTextStyle({
                  theme,
                  size: props.size,
                  transparent: props.transparent,
                }),
              ])}>
              {props.children}
            </Text>
          )}
        </View>
      </TouchableElement>
      {props.editable && (
        <View
          style={StyleSheet.flatten([
            getEditIconStyle({ ...props, theme }),
            props.editIconStyle,
          ])}>
          <Feather
            name="edit-2"
            size={theme.avatarSize[props.size] / 8}
            color={props.editIconColor || theme.textColor.disabled}
          />
        </View>
      )}
    </View>
  );
};

Avatar.displayName = 'Avatar';

Avatar.propTypes = {
  /** Image URL */
  backgroundImageUrl: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textStyle: PropTypes.object,
  title: PropTypes.string,
  editable: PropTypes.bool,
  onPress: PropTypes.func,
  editIconStyle: PropTypes.object,
  editIconColor: PropTypes.string,
  /** Node(s) to render within the component */
  children: PropTypes.node,
  /** Apply circl style to Avatar */
  circle: PropTypes.bool,
  /** The icon set to include. See the icon page for the list of sets */
  iconSet: PropTypes.string,
  /** The icon to include. See the icon page for the list of icons */
  glyph: PropTypes.string,
  /** Size of the component:
    'xs',
    's',
    'm',
    'l',
    'xl' */
  size: PropTypes.string, // PropTypes.oneOf(AVATAR_SIZES), TODO:
  /** Set to **true** to use transparent background */
  transparent: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  propView: {
    backgroundColor: 'transparent',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  editView: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
});

export default Avatar;
