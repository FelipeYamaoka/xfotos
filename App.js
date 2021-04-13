import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'
import xfotos from './assets/Xfotos.png';
import xfotosWhite from './assets/XfotosWhite.png';

// Definindo um valor que será reutilizado em mais de uma estilização
const TAMANHO_CIRCULO = 100;

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


export default function App() {
  // Propriedades de tempo, estado, referência de valor e outras possíveis definições
  const valorAnimado = useRef(new Animated.Value(0)).current; // valor de referência
  const animacao = (toValue) =>
    Animated.timing(valorAnimado, {
      toValue,
      duration: 3000,
      useNativeDriver: false,
    });
  // estado da animação - 0 para o background inicial branco / 1 para o background escuro
  const [index, setIndex] = useState(0);
  // condição para mudar o estado do background claro e escuro
  const onPress = () => {
    setIndex(index === 1 ? 0 : 1);
    animacao(index === 1 ? 0 : 1).start();
  };

  return (
    // Cabeçalho
    <SafeAreaProvider>
      <Header
        placement="center"
        leftComponent={{ icon: "menu", color: "#fff" }}
        centerComponent={<View><Image source={xfotosWhite} /></View>}
        rightComponent={{ icon: 'home', color: "#fff" }}
        containerStyle={{
          backgroundColor: '#161616', // gold
          justifyContent: 'space-around',
        }}
      />

      <View style={styles.container}>
        <StatusBar style="auto" hidden />
        <Circulo onPress={onPress} animatedValue={valorAnimado} />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

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
