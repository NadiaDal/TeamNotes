import React, {useState, useCallback} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import SizedBox from '../../components/SizedBox';
import {NoteFormItem} from '../../types/notes';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {addNote, updateNote} from '../../store/notesSlice';

const NoteForm = () => {
  const dispatch = useAppDispatch();
  const initState = useAppSelector(state => state.modal.selectedEntity);

  const [note, updateNoteItem] = useState<NoteFormItem>({
    name: initState?.name ?? '',
    description: initState?.description ?? '',
  });

  const clean = useCallback(() => {
    updateNoteItem({
      name: '',
      description: '',
    });
  }, []);

  const save = useCallback(() => {
    if (initState !== null) {
      dispatch(updateNote({...initState, ...note}));
    } else {
      dispatch(addNote(note));
    }
    clean();
  }, [clean, dispatch, initState, note]);

  return (
    <View style={styles.content}>
      <TextInput
        autoFocus={true}
        style={styles.input}
        inputAccessoryViewID="noteName"
        onChangeText={name => updateNoteItem({...note, name})}
        value={note.name}
        placeholder="Note name"
      />
      <TextInput
        style={styles.input}
        inputAccessoryViewID="noteDescription"
        onChangeText={description => updateNoteItem({...note, description})}
        value={note.description}
        multiline={true}
        numberOfLines={2}
        placeholder="Description"
      />
      <SizedBox height={16} />
      <Button
        title={initState !== null ? 'Save' : 'Create'}
        disabled={note.name === ''}
        onPress={save}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    padding: 22,
  },
  input: {
    marginTop: 8,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderBottomWidth: 1,
  },
});
export default NoteForm;
