import { StyleSheet, View } from "react-native";
import React from "react";
import Notifications from "./Notifications";
import ProfileData from "./ProfileData";
import { useTheme } from "@/contexts/ThemeContext";

export default function Header() {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <ProfileData />
      <Notifications />
    </View>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
    maxHeight: 60,
    backgroundColor: colors.white,
  },
});
