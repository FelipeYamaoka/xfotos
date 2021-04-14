import React from 'react';
import { StyleSheet, View, TouchableOpacity, Animated } from 'react-native';
import { AntDesign } from '@expo/vector-icons'

let TAMANHO_CIRCULO = 100;

// Definindo a animação do circulo pressionável
const Circulo = ({ onPress, animatedValue }) => {
  const inputRange = [0, 0.001, 0.5, 0.501, 1];

  const containerFundo = animatedValue.interpolate({
    inputRange,
    outputRange: ['#fff', '#fff', '#fff', '#444', '#444']
  });

  const circuloFundo = animatedValue.interpolate({
    inputRange,
    outputRange: ['#444', '#444', '#444', '#fff', '#fff']
  })

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.circleContainer,
        {
          backgroundColor: containerFundo,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            backgroundColor: circuloFundo,
            transform: [
              {
                perspective: 400,
              },
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: ['0deg', '-90deg', '-180deg'],
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 8, 1],
                }),
              },
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 1, 0],
                }),
              }
            ]
          }
        ]}
      >
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.circle, styles.circleButton]}>
            <AntDesign name='arrowright' size={28} color={'#f3090d'} />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  circleContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 8,
    paddingBottom: 100,
    backgroundColor: '#fff',
  },
  circle: {
    backgroundColor: '#444',
    width: TAMANHO_CIRCULO,
    height: TAMANHO_CIRCULO,
    borderRadius: TAMANHO_CIRCULO / 2,
  },
  circleButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Circulo;
