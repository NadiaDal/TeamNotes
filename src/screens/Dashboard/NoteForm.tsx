import React, {useState, useCallback} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import SizedBox from '../../components/SizedBox';
import {NoteItem} from '../../types/notes';

type NoteFormItem = Pick<NoteItem, 'name' | 'description' | 'priority'>;

const NoteForm = () => {
  // const initState = {
  //   name: '',
  //   description: '',
  //   priority: 0,
  // };
  const initState: NoteItem | null = null;
  const [note, updateNoteItem] = useState<NoteFormItem>({
    // @ts-ignore
    name: initState?.name ?? '',
    // @ts-ignore
    description: initState?.description ?? '',
    // @ts-ignore
    priority: initState?.priority ?? 0,
  });

  const clean = useCallback(() => {
    updateNoteItem({
      name: '',
      description: '',
      priority: 0,
    });
  }, []);

  const save = useCallback(() => {
    clean();
  }, [clean]);

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
