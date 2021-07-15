import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});

const HBox: React.FunctionComponent = ({ children }) => {
  return (
    <View style={styles.container}>
      {children}
    </View>
  );
};

export default HBox;
