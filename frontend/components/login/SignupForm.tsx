import { View, Text, StyleSheet } from "react-native";
import React from "react";
import BasicInput from "../BasicInput";
import PhoneIcon from "../../assets/icons/phone.svg";
import PasswordIcon from "../../assets/icons/password.svg";
import NameIcon from "../../assets/icons/name.svg";
import BasicButton from "../BasicButton";
import { Colors } from "@/constants/theme";
import { Link } from "expo-router";

export default function SignupForm() {
  return (
    <View style={styles.inputsAndButtonContainer}>
      <View style={styles.inputsContainer}>
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
          secureTextEntry
          hasEyeIcon
        />
        <BasicInput
          label="تأكيد كلمة المرور"
          placeholder="••••••••"
          icon={<PasswordIcon />}
          secureTextEntry
          hasEyeIcon
        />
      </View>
      <View style={styles.buttonAndForgetPasswordContainer}>
        <BasicButton label="انشاء حساب" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputsContainer: {
    gap: 20,
    flex: 1,
  },
  inputsAndButtonContainer: {
    gap: 40,
    flex: 1,
  },
  buttonAndForgetPasswordContainer: {
    gap: 10,
    flex: 1,
  },
});
