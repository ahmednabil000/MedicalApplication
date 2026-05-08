import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import styled from 'styled-components/native'
import Notifications from './Notifications'
import ProfileData from './ProfileData'

const Container = styled(View)`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 10px;
  max-height: 60px;
  background-color: white;
`

export default function Header() {
  return (
    <Container>
      <ProfileData />
      <Notifications />
    </Container>
  )
}
