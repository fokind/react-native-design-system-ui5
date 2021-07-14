import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useThemeContext } from '../util/ThemeProvider';
const getChildrenStyle = (
  { theme, space, verticalSpace, cropEndSpace, children },
  index
) => {
  const childStyle = [
    {
      marginRight: theme.layoutSpace[space],
    },
  ];
  if (index === 0) {
    childStyle.push({
      marginLeft: theme.layoutSpace[space],
    });
  }
  if (verticalSpace) {
    childStyle.push({
      marginVertical: theme.layoutSpace[verticalSpace],
    });
  }
  if (cropEndSpace) {
    if (index === 0) {
      childStyle.push({
        marginLeft: 0,
      });
    }
    if (index === React.Children.count(children) - 1) {
      childStyle.push({
        marginRight: 0,
      });
    }
  }
  return childStyle;
};
type InlineProps = {
  style?: object,
  space?:
    | 'none'
    | 'xxsmall'
    | 'xsmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | 'xxlarge',
  verticalSpace?:
    | 'none'
    | 'xxsmall'
    | 'xsmall'
    | 'small'
    | 'medium'
    | 'large'
    | 'xlarge'
    | 'xxlarge',
  cropEndSpace?: boolean
};
const Inline: React.SFC<InlineProps> = props => {
  const theme = useThemeContext();
  return (
    <View style={StyleSheet.flatten([styles.container, props.style])}>
      {React.Children.toArray(props.children).map((item, index) => (
        <View style={getChildrenStyle({ ...props, theme }, index)} key={index}>
          {item}
        </View>
      ))}
    </View>
  );
};
Inline.defaultProps = {
  space: 'medium',
  verticalSpace: 'none',
  cropEndSpace: true,
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    flexWrap: 'wrap',
  },
});
export default Inline;
