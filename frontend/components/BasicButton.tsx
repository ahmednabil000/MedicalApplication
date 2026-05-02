import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { Colors } from "@/constants/theme";

interface props {
  label: string;
}

const ButtonContainer = styled(TouchableOpacity)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px;
  gap: 10px;

  background: ${Colors.main};
  border-radius: 10px;

  flex: 1;
`;

const ButtonText = styled(Text)`
  color: ${Colors.white};
  font-family: "AlmaraiBold";
  font-size: 14px;
  line-height: 20px;
`;

const BasicButton = ({ label }: props) => {
  return (
    <>
      <ButtonContainer>
        <ButtonText>{label}</ButtonText>
      </ButtonContainer>
    </>
  );
};

export default BasicButton;
