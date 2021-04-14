import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, Button } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';
import xfotosWhite from '../../assets/XfotosWhite.png';

// Import o componente do botao em forma de circulo com animação
import Circulo from '../../components/BtnCirculo';

const TelaInicial = ({ navigation }) => {
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
    // Cabeçalho com a implementação do Circulo
    <SafeAreaProvider>
      <Header
        placement="center"
        centerComponent={<View><Image source={xfotosWhite} /></View>}
        rightComponent={() => (
          <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.push('Camera')}>
            <Feather
              name={'camera'}
              size={30}
              color={'#fff'}
            />
          </TouchableOpacity>
        )}
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
  }
});

export default TelaInicial;
