import { View, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Colors } from "@/constants/theme";
import HomePageContent from "@/components/home/content/HomePageContent";

export default function HomeScreen() {
  const router = useRouter();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <HomePageContent/>
      <Link
        href="/auth"
        style={styles.authLink}
        
      >
        Go to auth
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray10,
  },
  authLink: {
    color: "red",
    margin: 50,
    fontSize: 20,
    textAlign: "center",
  },
});
