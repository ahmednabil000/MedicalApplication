import { View, Text } from "react-native";
import React from "react";
import BasicInput from "../BasicInput";
import styled from "styled-components/native";
import PhoneIcon from "../../assets/icons/phone.svg";
import PasswordIcon from "../../assets/icons/password.svg";
import NameIcon from "../../assets/icons/name.svg";
import BasicButton from "../BasicButton";
import { Colors } from "@/constants/theme";
import { Link } from "expo-router";

const InputsContainer = styled(View)`
  gap: 20px;

  flex: 1;
`;

const InputsAndButtonContainer = styled(View)`
  gap: 40px;

  flex: 1;
`;

const ButtonAndForgetPasswordContainer = styled(View)`
  gap: 10px;

  flex: 1;
`;

const ForgetPasswordAndRememberMeContainer = styled(View)`
  gap: 10px;
  /* flex-direction: row; */
  align-items: center;
  flex: 1;
`;

const ForgetButtonText = styled(Text)`
  font-family: "AlmaraiRegular";

  font-size: 12px;
  line-height: 20px;

  color: ${Colors.main};
`;

export default function SignupForm() {
  return (
    <>
      <InputsAndButtonContainer>
        <InputsContainer>
          <BasicInput
            label="الاسم"
            placeholder="محمد نبيل"
            icon={<NameIcon />}
            keyboardType="default"
          />
          <BasicInput
            label="رقم الهاتف"
            placeholder="01061178893"
            icon={<PhoneIcon />}
            keyboardType="phone-pad"
          />
          <BasicInput
            label="كلمة المرور"
            placeholder="••••••••"
            icon={<PasswordIcon />}
            //   keyboardType="visible-password"
            secureTextEntry
            hasEyeIcon
          />
          <BasicInput
            label="تأكيد كلمة المرور"
            placeholder="••••••••"
            icon={<PasswordIcon />}
            //   keyboardType="visible-password"
            secureTextEntry
            hasEyeIcon
          />
        </InputsContainer>
        <ButtonAndForgetPasswordContainer>
          <BasicButton label="انشاء حساب" />
          {/* <ForgetPasswordAndRememberMeContainer>
            <Link href={"https://translate.google.com/"}>
              <ForgetButtonText>نسيت كلمة المرور ؟</ForgetButtonText>
            </Link>
          </ForgetPasswordAndRememberMeContainer> */}
        </ButtonAndForgetPasswordContainer>
      </InputsAndButtonContainer>
    </>
  );
}
