import React, { useRef, useState, useEffect } from 'react'
import { Modal, Platform, SafeAreaView, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { Camera } from 'expo-camera';

import {
  ContentCloseModalCamera, BtnCloseModalCamera, ContainerTakePicture, ContentTakePicture, BtnTakePicture,
  ContainerCamera, AvoidingView
} from './styles';

const OpenCamera = ({ navigation }) => {
  const cameraRef = useRef(null);

  const [mostrarCamera, setMostrarCamera] = useState(true);
  const [temPermissao, setTemPermissao] = useState(null);
  const [tipoCamera, setTipoCamera] = useState(Camera.Constants.Type.back);
  const [tipoFlash, setTipoFlash] = useState(Camera.Constants.FlashMode.off);
  const [photoCapturada, setPhotoCapturada] = useState(null);

  useEffect(() => {
    (
      async () => {
        if (Platform.OS === 'web') {
          const cameraDisponivel = await Camera.isAvailableAsync();
          setTemPermissao(cameraDisponivel);
        } else {
          const { status } = await Camera.requestPermissionsAsync();
          setTemPermissao(status === 'granted' ? true : false);
        }
      }
    )()
  }, []);

  if (!temPermissao) {
    return (
      <SafeAreaView>
        <Text>Acesso da camera negado! Verifique se o seu equipamento possui este recurso.</Text>
      </SafeAreaView>
    )
  }

  const tirarFoto = async () => {
    if (cameraRef) {
      const options = {
        quality: 0.5,
        skipProcessing: true
      }

      const photo = await cameraRef.current.takePictureAsync(options);
      console.log(photo);

      setPhotoCapturada(photo.uri);
    }
  }

  const MudarTipoCamera = () => {
    if (tipoCamera === Camera.Constants.Type.back) {
      setTipoCamera(Camera.Constants.Type.front);
    } else {
      setTipoCamera(Camera.Constants.Type.back);
    }
  }

  const LigaDesligaFlash = () => {
    if (tipoFlash === Camera.Constants.FlashMode.off) {
      setTipoFlash(Camera.Constants.FlashMode.on);
    } else {
      setTipoFlash(Camera.Constants.FlashMode.off);
    }
  }

  return (
    <Modal visible={mostrarCamera}>
      <ContainerCamera>
        <Camera
          ref={cameraRef}
          type={tipoCamera}
          autoFocus={Camera.Constants.AutoFocus.on}
          flashMode={tipoFlash}
          style={{ flex: 1 }}
          permissionDialogTitle={"Permission to use camera"}
          permissionDialogMessage={
            "We need your permission to use your camera phone"
          }
        >
          <ContentCloseModalCamera>
            <BtnCloseModalCamera activeOpacity={0.6} onPress={() => {
              setMostrarCamera(false);
              navigation.push('TelaInicial')
            }}>
              <Feather
                name={'x'}
                size={30}
                color={'#ededed'}
              />
            </BtnCloseModalCamera>

            <BtnCloseModalCamera activeOpacity={0.6} onPress={LigaDesligaFlash}>
              <Feather
                name={tipoFlash === Camera.Constants.FlashMode.on ? 'zap' : 'zap-off'}
                size={30}
                color={'#ededed'}
                style={{ marginTop: 25 }}
              />
            </BtnCloseModalCamera>
          </ContentCloseModalCamera>

          <ContainerTakePicture>
            <ContentTakePicture>
              <BtnTakePicture activeOpacity={0.6} onPress={tirarFoto}>
                <Feather
                  name={'camera'}
                  size={30}
                  color={'#000'}
                />
              </BtnTakePicture>

              <BtnTakePicture activeOpacity={0.6} onPress={MudarTipoCamera} style={{ marginLeft: 20 }}>
                <Feather
                  name={'refresh-ccw'}
                  size={30}
                  color={'#000'}
                />
              </BtnTakePicture>
            </ContentTakePicture>
          </ContainerTakePicture>
        </Camera>
      </ContainerCamera>
    </Modal>
  )
}

export default OpenCamera;
