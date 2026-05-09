import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import MyReservationsContent from '@/components/my-reservations/MyReservationsContent'

export default function MyReservations() {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <MyReservationsContent/>
    </View>
  )
}

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray10,
    
  },
})