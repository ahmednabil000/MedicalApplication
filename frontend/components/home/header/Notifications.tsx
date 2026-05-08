import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import NotificationIcon from "../../../assets/icons/notifications.svg";


const Container = styled(TouchableOpacity)`
    padding: 10px;
`

export default function Notifications() {
  return (
    <View>
        <Container>
<NotificationIcon/>
    
        </Container>
    </View>
  )
}

