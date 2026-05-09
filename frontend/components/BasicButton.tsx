import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/theme";

interface props {
  label: string;
  onPress?: () => void;
}

const BasicButton = ({ label, onPress }: props) => {
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

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    gap: 10,
    backgroundColor: Colors.main,
    borderRadius: 10,
    
  },
  buttonText: {
    color: Colors.white,
    fontFamily: "AlmaraiBold",
    fontSize: 14,
    lineHeight: 20,
  },
});

export default BasicButton;
