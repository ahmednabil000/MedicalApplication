import { View, StyleSheet } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import HomePageContent from "@/components/home/content/HomePageContent";

export default function HomeScreen() {
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <HomePageContent />
      {/* <Link
        href="/auth"
        style={styles.authLink}
        
      >
        Go to auth
      </Link> */}
    </View>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  authLink: {
    color: "red",
    // margin: 50,
    fontSize: 20,
    textAlign: "center",
  },
});
