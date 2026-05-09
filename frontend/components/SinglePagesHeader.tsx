import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { ICONS } from '@/constants/icons'
import { useRouter } from 'expo-router'


interface Props {
  title: string
}

export default function SinglePagesHeader({title}:Props) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);
  const router = useRouter()

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={()=>router.back()} activeOpacity={.9}>

      <ICONS.backArrow style={styles.arrowBack}/>
        </TouchableOpacity>
      <Text style={styles.text}>{title}</Text>
      <View/>
    </View>
  )
}

const getStyles = (colors: any) => StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor:colors.white,
        paddingHorizontal:15,
        paddingVertical:10,
        gap:10
    },
    text:{
        fontFamily: "AlmaraiBold",
        fontSize: 14,
        color: colors.gray700,
        marginRight:-20,
        textAlign: "center",
    },
    arrowBack:{
        width: 24,
        height: 24,
    }
})