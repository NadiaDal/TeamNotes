import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import IconButton from './IconButton';
import {NoteItem} from '../types/notes';
import {useAppDispatch} from '../store/hooks';
import {noteDown, noteUp} from '../store/notesSlice';

interface NoteCardProps {
  item: NoteItem;
  index: number;
  onOpen: () => void;
}
const NoteCard: React.FC<NoteCardProps> = ({item, index, onOpen}) => {
  const dispatch = useAppDispatch();

  return (
    <TouchableOpacity onPress={onOpen}>
      <Card key={item.id} containerStyle={styles.container}>
        <Text style={styles.title}>{item.name}</Text>

        {item?.description && item.description.length > 0 ? (
          <Text style={styles.description}>{item.description}</Text>
        ) : null}
        <View style={styles.buttonsContainer}>
          <IconButton
            key="buttonUp"
            iconName="north"
            onPress={() =>
              dispatch(noteUp({itemIndex: index, itemId: item.id}))
            }
          />
          <IconButton
            key="buttonDown"
            iconName="south"
            onPress={() =>
              dispatch(noteDown({itemIndex: index, itemId: item.id}))
            }
          />
        </View>
      </Card>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    opacity: 0.9,
    borderRadius: 8,
    padding: 8,
  },
  title: {
    paddingLeft: 8,
    fontSize: 16,
    fontWeight: '500',
  },
  description: {
    paddingLeft: 8,
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default NoteCard;
