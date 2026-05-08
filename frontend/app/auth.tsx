import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import LoginFormContent from "@/components/login/LoginFormContent";

export default function AuthScreen() {
  const [isSignup, setIsSignup] = useState<boolean>(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pageHeaderContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/small-logo.png")}
            style={styles.logoImage}
          />
          <Text style={styles.logoText}>سلامات</Text>
        </View>
        <View style={styles.pageTitleContainer}>
          <Text style={styles.pageTitleText}>
            {!isSignup ? "تسجيل الدخول" : "انشاء حساب"}
          </Text>
          <Text style={styles.pageSubtitleText}>انضم إلينا الآن</Text>
        </View>
      </View>
      <LoginFormContent isSignup={isSignup} setIsSignup={setIsSignup} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main,
    gap: 20,
  },
  pageHeaderContainer: {
    flex: 1,
    alignItems: "center",
    maxHeight: "27%",
    padding: 10,
    gap: 40,
  },
  logoContainer: {
    flex: 1,
    flexDirection: "row",
    gap: 5,
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 20,
    height: 18,
  },
  logoText: {
    color: Colors.white,
    fontFamily: "ElMessiri",
    flexShrink: 0,
    textAlign: "left",
    fontSize: 20,
    fontWeight: "600",
  },
  pageTitleContainer: {
    flex: 1,
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  pageTitleText: {
    color: Colors.white,
    fontFamily: "AlmaraiBold",
    flexShrink: 0,
    textAlign: "left",
    fontSize: 36,
  },
  pageSubtitleText: {
    color: Colors.white,
    fontFamily: "AlmaraiRegular",
    flexShrink: 0,
    textAlign: "left",
    fontSize: 20,
  },
});
