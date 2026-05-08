import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'
import { Colors } from '@/constants/theme'
import { Image } from 'expo-image'

const Container = styled(View)`
  flex: 1;
  
  
  flex-direction: row;
  padding: 10px;
  gap:7px;
`

const ProfileAvatar = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 1000px;
  padding: 20px;
  border: 1px solid ${Colors.gray300};
`

const ProfileInfo = styled(View)`
  flex: 1;
`

const ProfileWelcomeText = styled(Text)`
  font-size: 10px;
   color: ${Colors.gray400};
  font-family:"AlmaraiRegular" ;
`

const ProfileName = styled(Text)`
  font-size: 12px;
  color: ${Colors.gray700};
  font-family:"AlmaraiBold" ;
`


export default function ProfileData() {
  return (
    <Container>
      <ProfileAvatar source={require("../../../assets/images/salamat.png")} />
      <ProfileInfo>
        <ProfileWelcomeText>مرحبا بك</ProfileWelcomeText>
        <ProfileName>محمد نبيل</ProfileName>
      </ProfileInfo>
    </Container>
  )
}

