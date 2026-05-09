
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { Stack } from "expo-router";
import { StatusBar, View, Text, ActivityIndicator } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";

export const unstable_settings = {
  anchor: "(tabs)",
};

function RootLayoutInner() {
  const { colors } = useTheme();
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
          backgroundColor: colors.main,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={colors.white} />
        <Text
          style={{
            color: colors.white,
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
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: colors.gray10,
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
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
          <Stack.Screen
            name="add-reservation"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="SingleReservation"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </SafeAreaProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.main}
        // hidden
      />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutInner />
    </ThemeProvider>
  );
}
