import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';

interface IconButtonProps {
  iconName: string;
  onPress: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({iconName, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.label}>
        <Icon name={iconName} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  label: {
    padding: 8,
    borderRadius: 8,
  },
});

export default IconButton;
