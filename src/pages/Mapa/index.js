import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

export default function Mapa() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={{
          latitude: -23.4331561,
          longitude: -47.4646909,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});