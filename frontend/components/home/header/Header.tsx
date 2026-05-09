import { StyleSheet, View } from "react-native";
import React from "react";
import Notifications from "./Notifications";
import ProfileData from "./ProfileData";
import { Colors } from "@/constants/theme";

export default function Header() {
  return (
    <View style={styles.container}>
      <ProfileData />
      <Notifications />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    maxHeight: 60,
    backgroundColor: Colors.white,
  },
});
