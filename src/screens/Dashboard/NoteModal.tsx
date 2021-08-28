import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet} from 'react-native';
import NoteForm from './NoteForm';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {closeModal} from '../../store/modalSlice';

const NoteModal = () => {
  const isModalVisible = useAppSelector(state => state.modal.isModalVisible);
  const dispatch = useAppDispatch();
  return (
    <Modal
      isVisible={isModalVisible}
      onSwipeComplete={() => dispatch(closeModal())}
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
