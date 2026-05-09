import { StyleSheet, View, TouchableOpacity } from 'react-native'
import React from 'react'
import NotificationIcon from "../../../assets/icons/notifications.svg";
import { ICONS } from '@/constants/icons';
import { usePathname } from 'expo-router';


export default function Notifications() {

const pathname = usePathname()

const isMyReservationsRoute = pathname.includes("/MyReservations")

  return (
    <View style={styles.container}>
      {isMyReservationsRoute&&<TouchableOpacity >

        <ICONS.filter/>
      </TouchableOpacity>}
      <TouchableOpacity >
        <NotificationIcon />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: 10,
  },
})

