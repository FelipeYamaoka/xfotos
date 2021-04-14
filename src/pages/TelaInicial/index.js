import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Animated, Button, Linking } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import { Feather, FontAwesome } from '@expo/vector-icons'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';
import xfotosWhite from '../../assets/XfotosWhite.png';

// Import o componente do botao em forma de circulo com animação
import Circulo from '../../components/BtnCirculo';

const TelaInicial = ({ navigation }) => {
  // Estado da navegação na web
  const [resultado, setResultado] = useState(null);

  // Navegação WEB
  const navegarWeb = async () => {
    let resultado = await WebBrowser.openBrowserAsync('https://expo.io');
    setResultado(resultado);
  };

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

  // Enviar mensagem de sugestao atraves do whatsapp
  function sendWhatsapp() {
    let numero = '15991453639';
    let mensagem = 'Olá, desejo dar sujestões para a aplicação.'
    Linking.openURL(`whatsapp://send?phone=55${numero}&text=${mensagem}`);
  }

  return (
    // Cabeçalho com a implementação do Circulo
    <SafeAreaProvider>
      <Header
        placement="center"
        leftComponent={() => (
          <TouchableOpacity activeOpacity={0.6} onPress={sendWhatsapp}>
            <FontAwesome
              name={'whatsapp'}
              size={30}
              color={'#fff'}
            />
          </TouchableOpacity>
        )}
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

      <TouchableOpacity activeOpacity={0.6} onPress={() => navigation.push('Mapa')}>
        <Feather
          name={'map'}
          size={50}
          color={'#0ab6d8'}
        />
      </TouchableOpacity>
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
