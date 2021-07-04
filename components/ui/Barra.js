import React from 'react';

import {Button} from 'react-native-paper';

import {View} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

const BarraSuperior = ({navigation, route}) => {
  const handlePress = () => {
    navigation.navigate('NuevoCliente');
  };
  return (
    <>
      <View style={{flexDirection: 'row-reverse'}}>
        <Button
          onPress={() => {
            handlePress();
          }}
          color="#FFF">
          Cliente
          <View>
            <Icon name="plus" size={20} />
          </View>
        </Button>
      </View>
    </>
  );
};

export default BarraSuperior;
