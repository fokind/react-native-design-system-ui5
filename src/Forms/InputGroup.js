import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const renderInput = ({ child }) => {
  return React.cloneElement(child, {
    style: { borderWidth: 0, outlineWidth: 0 },
  });
};

const InputGroup = props => {
  return (
    <View style={StyleSheet.flatten([styles.container, props.style])}>
      {React.Children.map(props.children, child => {
        switch (child.type.name) {
          case 'FormInput':
            return renderInput({ child });
          default:
            return child;
        }
      })}
    </View>
  );
};

InputGroup.propTypes = {
  /**  To override default style */
  style: PropTypes.object,
};

InputGroup.defaultProps = {
  placeholder: '',
  value: '',
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: 'rgb(137, 145, 154)',
    borderWidth: 1,
    marginVertical: 4,
    fontSize: 14,
    lineHeight: 19.6,
    color: '#32363a',
    fontFamily: '"72", "72full", Arial, Helvetica, sans-serif',
    fontWeight: '400',
    height: 36,
    paddingHorizontal: 10,
    minWidth: 44,
  },
});

export default InputGroup;
