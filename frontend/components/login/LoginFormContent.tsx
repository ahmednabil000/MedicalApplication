import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import styled, { css } from "styled-components/native";
import { Colors } from "@/constants/theme";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

interface Props {
  isSignup: boolean;
  setIsSignup: Dispatch<SetStateAction<boolean>>;
}

interface TabButtonProps {
  $isActive?: boolean;
}

const Container = styled(View)`
  flex: 1;

  padding: 10px;

  background: ${Colors.white};
  border-radius: 20px 20px 0px 0px;
`;

const TabsContainer = styled(View)`
  flex: 1;

  gap: 10px;
  padding: 10px;
  border-radius: 20px;
  flex-direction: row;
  background: ${Colors.gray10};
  max-height: 65px;
`;

const TabButton = styled(TouchableOpacity)<TabButtonProps>`
  padding: 10px;
  flex: 1;
  gap: 10px;

  background: ${Colors.white};
  border-radius: 10px;

  align-items: center;
  text-align: center;
  justify-content: center;

  ${({ $isActive }) =>
    $isActive &&
    css`
      background: ${Colors.main};
    `}
`;

const TabButtonText = styled(Text)<TabButtonProps>`
  font-family: "AlmaraiRegular";
  font-size: 16px;
  color: ${Colors.gray700};

  line-height: 20px;
  ${({ $isActive }) =>
    $isActive &&
    css`
      color: ${Colors.white};
    `}
`;

const FormContentContainer = styled(ScrollView)`
  padding: 20px 10px;

  gap: 40px;

  background: ${Colors.white};

  /* Inside auto layout */
  flex: 1;
`;

export default function LoginFormContent({ isSignup, setIsSignup }: Props) {
  return (
    <Container>
      <TabsContainer>
        <TabButton
          $isActive={!isSignup}
          onPress={() => {
            setIsSignup(false);
          }}
        >
          <TabButtonText $isActive={!isSignup}>تسجيل الدخول</TabButtonText>
        </TabButton>

        <TabButton
          $isActive={isSignup}
          onPress={() => {
            setIsSignup(true);
          }}
        >
          <TabButtonText $isActive={isSignup}>انشاء حساب</TabButtonText>
        </TabButton>
      </TabsContainer>
      <FormContentContainer>
        {!isSignup && <LoginForm />}
        {isSignup && <SignupForm />}
      </FormContentContainer>
    </Container>
  );
}
