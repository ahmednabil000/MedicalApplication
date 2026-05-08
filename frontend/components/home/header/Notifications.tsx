import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import NotificationIcon from "../../../assets/icons/notifications.svg";

export default function Notifications() {
  return (
    <View>
      <TouchableOpacity style={styles.container}>
        <NotificationIcon />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
})

