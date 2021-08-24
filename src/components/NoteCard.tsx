import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Card} from 'react-native-elements';
import SizedBox from './SizedBox';
import {NoteItem} from '../types/notes';

interface NoteCardProps {
  item: NoteItem;
  onOpen: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({item, onOpen}) => {
  return (
    <TouchableOpacity onPress={onOpen}>
      <Card key={item.id} containerStyle={styles.container}>
        <Text style={styles.title}>{item.name}</Text>

        {item?.description && item.description.length > 0 ? (
          <Text style={styles.description}>{item.description}</Text>
        ) : null}
        <SizedBox height={8} />
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
    fontSize: 16,
    fontWeight: '500',
  },
  description: {
    paddingLeft: 8,
  },
  icon: {
    alignSelf: 'flex-start',
    paddingLeft: 8,
  },
  checkContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  checkbox: {
    paddingLeft: 0,
  },
});

export default NoteCard;
