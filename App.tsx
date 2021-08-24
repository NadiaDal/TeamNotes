import React from 'react';
import {StyleSheet, View} from 'react-native';
import NotesDashboard from './src/screens/Dashboard';

// TODO To be scaled localization should be implemented
const App = () => {
  return (
    <View style={styles.container}>
      <NotesDashboard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
