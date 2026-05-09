import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
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
  isTextArea?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: string;
  onPress?: () => void;
}

export default function BasicInput({
  label,
  placeholder,
  icon,
  keyboardType = "default",
  secureTextEntry = false,
  endIcon,
  hasEyeIcon = false,
  isTextArea = false,
  value,
  onChangeText,
  error,
  onPress,
}: BasicInputProps) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);
  const [showPassword, setShowPassword] = useState<boolean>(secureTextEntry);

  const InputComponent = (
    <View
      style={[
        styles.inputContainer,
        isTextArea && { alignItems: "flex-start", paddingVertical: 10 },
        error && { borderColor: "red" },
      ]}
    >
      <View
        style={[
          styles.iconAndInputContainer,
          isTextArea && { alignItems: "flex-start" },
        ]}
      >
        {icon}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.gray400}
          keyboardType={keyboardType}
          secureTextEntry={showPassword}
          value={value}
          onChangeText={onChangeText}
          editable={!onPress}
          pointerEvents={onPress ? "none" : "auto"}
          style={[
            styles.theInput,
            isTextArea && { textAlignVertical: "top", height: 80 },
          ]}
          multiline={isTextArea}
          numberOfLines={isTextArea ? 3 : 1}
          selectTextOnFocus={!secureTextEntry}
        />
      </View>
      {endIcon}
      {hasEyeIcon && (
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeIcon /> : <EyeLinedIcon />}
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.otterInputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      {onPress ? (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
          {InputComponent}
        </TouchableOpacity>
      ) : (
        InputComponent
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  otterInputContainer: {
    gap: 10,
  },
  inputLabel: {
    color: colors.gray700,
    fontFamily: "AlmaraiRegular",
    fontSize: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    gap: 10,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 10,
    minHeight: 50,
  },
  iconAndInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  theInput: {
    flex: 1,
    direction: "rtl",
    fontFamily: "AlmaraiRegular",
    textAlign: "right",
    color: colors.gray700,
    height: "100%",
  },
  errorText: {
    color: "red",
    fontSize: 10,
    marginTop: -5,
    textAlign: "right",
    fontFamily: "AlmaraiRegular",
  },
});
