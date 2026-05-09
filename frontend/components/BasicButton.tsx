import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface props {
  label: string;
  onPress?: () => void;
}

const BasicButton = ({ label, onPress }: props) => {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.buttonContainer}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const getStyles = (colors: any) => StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    gap: 10,
    backgroundColor: colors.main,
    borderRadius: 10,
    
  },
  buttonText: {
    color: colors.white,
    fontFamily: "AlmaraiBold",
    fontSize: 14,
    lineHeight: 20,
  },
});

export default BasicButton;
