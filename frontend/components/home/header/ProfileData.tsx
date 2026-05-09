import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { Image } from 'expo-image'

export default function ProfileData() {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>

      <Image
        style={styles.profileAvatar}
        source={require("../../../assets/images/small-logo.png")}
        />
        </View>
      <View style={styles.profileInfo}>
        <Text style={styles.profileWelcomeText}>مرحبا بك</Text>
        <Text style={styles.profileName}>محمد نبيل</Text>
      </View>
    </View>
  )
}

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
    gap: 7,
    alignItems: "center",
  },
   imageContainer: {
    width: 40,
    height: 40,
    maxWidth: 40,
    maxHeight: 40,
    borderRadius: 1000,
    padding: 20,
    borderWidth: 3,
    borderColor: colors.secondary,
    backgroundColor: colors.main,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
   },
  profileAvatar: {
    width: 30,
    height: 30,
    
    
  },
  profileInfo: {
    flex: 1,
  },
  profileWelcomeText: {
    fontSize: 10,
    color: colors.gray400,
    fontFamily: "AlmaraiRegular",
  },
  profileName: {
    fontSize: 12,
    color: colors.gray700,
    fontFamily: "AlmaraiBold",
  },
})
