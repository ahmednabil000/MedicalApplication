import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect } from "react";
import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

export default function SplashScreen() {
  const router = useRouter();
  const [fontLoaded] = useFonts({
    ElMessiri: require("../assets/fonts/messiri.ttf"),
    AlmaraiRegular: require("../assets/fonts/Almarai-Regular.ttf"),
    AlmaraiBold: require("../assets/fonts/Almarai-Bold.ttf"),
    AlmaraiLight: require("../assets/fonts/Almarai-Light.ttf"),
    AlmaraiExtraBold: require("../assets/fonts/Almarai-ExtraBold.ttf"),
  });

  useEffect(() => {
    // Navigate to the auth screen after the animation completes
    const timer = setTimeout(() => {
      router.replace("/(tabs)/Home");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  if (!fontLoaded) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.main,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={Colors.white} />
        <Text
          style={{
            color: Colors.white,
            marginTop: 16,
            fontSize: 16,
            fontFamily: "System",
          }}
        >
          جاري التحميل...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Animated.View entering={FadeInDown.duration(1000).springify()}>
          <Image
            source={require("../assets/images/small-logo.png")}
            style={styles.logoImage}
            contentFit="contain"
          />
        </Animated.View>
        <Animated.Text
          entering={FadeInUp.duration(1000).delay(800).springify()}
          style={styles.logoText}
        >
          سلامات
        </Animated.Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.main,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  logoImage: {
    width: 150,
    height: 150,
  },
  logoText: {
    color: Colors.white,
    fontFamily: "ElMessiri",
    fontSize: 56,
    fontWeight: "bold",
    textAlign: "center",
  },
});
