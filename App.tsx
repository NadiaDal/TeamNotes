import React, {useCallback, useEffect, useRef} from 'react';
import {AppState, AppStateStatus, StyleSheet, View} from 'react-native';
import NotesDashboard from './src/screens/Dashboard';
import {Provider} from 'react-redux';
import store from './src/store';
import {saveToStorage} from './src/helpers/asyncStore';
import {loadStore} from './src/store/notesSlice';
import AutomergeStore from './src/automerge';

const App = () => {
  const appState = useRef(AppState.currentState);

  const saveStoreOnClose = useCallback(async () => {
    await saveToStorage(AutomergeStore.persist());
  }, []);

  useEffect(() => {
    store.dispatch(loadStore());

    const subscription = (nextAppState: AppStateStatus) => {
      appState.current = nextAppState;
      if (appState.current.match(/inactive|background/)) {
        saveStoreOnClose();
      }
    };
    AppState.addEventListener('change', subscription);
    return () => {
      AppState.removeEventListener('change', subscription);
    };
  }, [saveStoreOnClose]);
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
