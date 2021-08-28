import React from 'react';
import {StyleSheet, View} from 'react-native';
import NotesDashboard from './src/screens/Dashboard';
import {Provider} from 'react-redux';
import store from './src/store';

// TODO To be scaled localization should be implemented
const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <NotesDashboard />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
