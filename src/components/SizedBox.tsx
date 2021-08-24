import React from 'react';
import {View} from 'react-native';

const SizedBox: React.FC<{height: number}> = ({height}) => {
  return <View style={{height}} />;
};

export default SizedBox;
