import styled from 'styled-components/native';

export const AvoidingView = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
`;

export const ContainerCamera = styled.View`
  flex: 1;
  flex-direction: column;
  background: #000;
`;

export const ContainerTakePicture = styled.View`
  flex: 1;
  align-items: center;
`;

export const ContentTakePicture = styled.View`
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const BtnTakePicture = styled.TouchableOpacity`
  background: #ededed;
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  border-radius: 35px;
  margin-bottom: 20px;
`;

export const ContentCloseModalCamera = styled.SafeAreaView`
  align-items: flex-end;
  margin-right: 20px;
`;

export const BtnCloseModalCamera = styled.TouchableOpacity`
  width: 80px;
  align-items: flex-end;
`;
