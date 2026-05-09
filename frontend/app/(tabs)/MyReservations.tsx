import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/theme'
import MyReservationsContent from '@/components/my-reservations/MyReservationsContent'

export default function MyReservations() {
  return (
    <View style={styles.container}>
      <MyReservationsContent/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray10,
    
  },
})