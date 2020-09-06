import styled from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled(RectButton)`
  width: 40%;
  height: 60px;
  background: #0949b5;
  border-radius: 10px;
  margin: 8px 8px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  text-align: center;
  width: 100%;
`
