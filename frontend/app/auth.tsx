import { View, Text } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/theme";
import { Image } from "expo-image";
import LoginFormContent from "@/components/login/LoginFormContent";

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${Colors.main};
  gap: 20px;
`;

const PageHeaderContainer = styled(View)`
  flex: 1;

  align-items: center;
  /* max-height: 73%; */
  max-height: 27%;

  padding: 10px 10px;
  gap: 40px;
`;

const LogoContainer = styled(View)`
  flex: 1;
  flex-direction: row;
  gap: 5px;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled(Text)`
  color: ${Colors.white};
  font-family: "ElMessiri";
  flex-shrink: 0;
  text-align: start;
  white-space: nowrap;
  font-size: 20px;
  font-weight: 600;
`;

const PageTitleContainer = styled(View)`
  flex: 1;

  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const PageTitleText = styled(Text)`
  color: ${Colors.white};
  font-family: "AlmaraiBold";
  flex-shrink: 0;
  text-align: start;
  white-space: nowrap;
  font-size: 36px;
`;

const PageSubtitleText = styled(Text)`
  color: ${Colors.white};
  font-family: "AlmaraiRegular";
  flex-shrink: 0;
  text-align: start;
  white-space: nowrap;
  font-size: 20px;
`;

export default function AuthScreen() {
  const [isSignup, setIsSignup] = useState<boolean>(false);

  return (
    <Container>
      <PageHeaderContainer>
        <LogoContainer>
          <Image
            source={require("../assets/images/small-logo.png")}
            style={{ width: 20, height: 18 }}
          />
          <LogoText>سلامات</LogoText>
        </LogoContainer>
        <PageTitleContainer>
          <PageTitleText>
            {!isSignup ? "تسجيل الدخول" : "انشاء حساب"}
          </PageTitleText>
          <PageSubtitleText>انضم إلينا الآن</PageSubtitleText>
        </PageTitleContainer>
      </PageHeaderContainer>
      <LoginFormContent isSignup={isSignup} setIsSignup={setIsSignup} />
    </Container>
  );
}
