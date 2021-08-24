import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet} from 'react-native';
import NoteForm from './NoteForm';

const NoteModal = () => {
  return (
    <Modal
      isVisible={true}
      onSwipeComplete={() => {}}
      useNativeDriverForBackdrop
      swipeDirection={['down']}
      style={styles.container}>
      <NoteForm />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});
export default NoteModal;
