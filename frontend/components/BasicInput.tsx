import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
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
  //   onChangeText: string;
}

const OtterInputContainer = styled(View)`
  flex: 1;
  gap: 10px;
`;

const InputLabel = styled(Text)`
  color: ${Colors.gray700};
  font-family: "AlmaraiRegular";
  font-size: 12px;
`;

const InputContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 0px 10px;
  gap: 10px;

  background: ${Colors.white};
  /* gray200 */
  border: 1px solid ${Colors.gray200};
  border-radius: 10px;
`;

const IconAndInputContainer = styled(View)`
  flex-direction: row;
  align-items: center;

  gap: 6px;
`;

const TheInput = styled(TextInput)``;

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
    <>
      <OtterInputContainer>
        <InputLabel>{label}</InputLabel>
        <InputContainer>
          <IconAndInputContainer>
            {icon}
            <TextInput
              placeholder={placeholder}
              placeholderTextColor={Colors.gray400}
              keyboardType={keyboardType}
              secureTextEntry={showPassword}
              style={{ direction: "rtl", fontFamily: "AlmaraiRegular" }}
            />
          </IconAndInputContainer>
          {endIcon}
          {hasEyeIcon && (
            <>
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeIcon /> : <EyeLinedIcon />}
              </TouchableOpacity>
            </>
          )}
        </InputContainer>
      </OtterInputContainer>
    </>
  );
}
