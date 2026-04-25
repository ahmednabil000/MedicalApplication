import { Colors } from "@/constants/theme";
import { Stack } from "expo-router";
import { StatusBar, View, Text, ActivityIndicator } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const [fontLoaded] = useFonts({
    ElMessiri: require("../assets/fonts/messiri.ttf"),
    AlmaraiRegular: require("../assets/fonts/Almarai-Regular.ttf"),
    AlmaraiBold: require("../assets/fonts/Almarai-Bold.ttf"),
    AlmaraiLight: require("../assets/fonts/Almarai-Light.ttf"),
    AlmaraiExtraBold: require("../assets/fonts/Almarai-ExtraBold.ttf"),
  });

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
    <>
      <SafeAreaProvider style={{ direction: "rtl" }}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="auth"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.main}
        // hidden
      />
    </>
  );
}
