import React from 'react';
import {StyleSheet, ImageBackground, FlatList, View, Text} from 'react-native';
import {FAB} from 'react-native-elements';
import NoteModal from './NoteModal';
import NoteCard from '../../components/NoteCard';
import {Colors} from '../../theme/colors';
import {backgroundDashboardImage} from '../../theme/images';
import SizedBox from '../../components/SizedBox';
import {NoteItem} from '../../types/notes';

const Dashboard = () => {
  return (
    <ImageBackground
      source={backgroundDashboardImage}
      resizeMode="cover"
      style={styles.image}>
      <View style={styles.header}>
        <Text style={styles.text}>Awesome team</Text>
      </View>
      <FlatList<NoteItem>
        data={[]}
        renderItem={({item}) => (
          <NoteCard key={item.id} item={item} onOpen={() => {}} />
        )}
      />
      <SizedBox height={16} />
      <FAB
        title="Add note"
        size="small"
        color={Colors.primaryBlack}
        placement="right"
        onPress={() => {}}
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
  text: {
    color: 'white',
    fontSize: 22,
    lineHeight: 44,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-start',
  },
});

export default Dashboard;
