import React from 'react';
import {StyleSheet, ImageBackground, FlatList, View, Text} from 'react-native';
import {FAB} from 'react-native-elements';
import NoteModal from './NoteModal';
import NoteCard from '../../components/NoteCard';
import {Colors} from '../../theme/colors';
import {backgroundDashboardImage} from '../../theme/images';
import SizedBox from '../../components/SizedBox';
import {NoteItem} from '../../types/notes';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {openModal} from '../../store/modalSlice';

const Dashboard = () => {
  const notes = useAppSelector(state => state.notes.items);
  const isAutomergeInited = useAppSelector(
    state => state.notes.isAutomergeInited,
  );
  const dispatch = useAppDispatch();
  return (
    <ImageBackground
      source={backgroundDashboardImage}
      resizeMode="cover"
      style={styles.image}>
      <View style={styles.header}>
        <Text style={styles.title}>Awesome team</Text>
      </View>
      {!isAutomergeInited ? (
        <Text style={styles.text}>Please try again later</Text>
      ) : null}
      <FlatList<NoteItem>
        data={notes}
        renderItem={({item, index}) => (
          <NoteCard
            key={item.id}
            index={index}
            item={item}
            onOpen={() => dispatch(openModal(item))}
          />
        )}
      />
      <SizedBox height={16} />
      <FAB
        title="Add note"
        size="small"
        color={Colors.primaryBlack}
        placement="right"
        onPress={() => dispatch(openModal())}
        disabled={!isAutomergeInited}
      />
      <NoteModal />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: 0.9,
    backgroundColor: Colors.primaryBlack,
  },
  title: {
    color: Colors.white,
    fontSize: 22,
    lineHeight: 44,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    color: Colors.white,
    fontSize: 16,
    lineHeight: 44,
    alignSelf: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
});

export default Dashboard;
