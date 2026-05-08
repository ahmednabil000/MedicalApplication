import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/theme";
import EyeIcon from "../assets/icons/eye.svg";
import EyeLinedIcon from "../assets/icons/eye-lined.svg";

interface BasicInputProps {
  label: string;
  icon?: React.ReactElement;
  placeholder: string;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad"
    | "url"
    | "visible-password";
  endIcon?: React.ReactElement;
  secureTextEntry?: boolean;
  hasEyeIcon?: boolean;
}

export default function BasicInput({
  label,
  placeholder,
  icon,
  keyboardType = "default",
  secureTextEntry = false,
  endIcon,
  hasEyeIcon = false,
}: BasicInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(secureTextEntry);

  return (
    <View style={styles.otterInputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <View style={styles.inputContainer}>
        <View style={styles.iconAndInputContainer}>
          {icon}
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={Colors.gray400}
            keyboardType={keyboardType}
            secureTextEntry={showPassword}
            style={styles.theInput}
          />
        </View>
        {endIcon}
        {hasEyeIcon && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeIcon /> : <EyeLinedIcon />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  otterInputContainer: {
    flex: 1,
    gap: 10,
  },
  inputLabel: {
    color: Colors.gray700,
    fontFamily: "AlmaraiRegular",
    fontSize: 12,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    gap: 10,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray200,
    borderRadius: 10,
  },
  iconAndInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  theInput: {
    direction: "rtl",
    fontFamily: "AlmaraiRegular",
  },
});
