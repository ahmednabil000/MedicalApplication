import { View, Text, StyleSheet } from "react-native";
import React from "react";
import BasicInput from "../BasicInput";
import PhoneIcon from "../../assets/icons/phone.svg";
import PasswordIcon from "../../assets/icons/password.svg";
import BasicButton from "../BasicButton";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "expo-router";

export default function LoginForm() {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);

  return (
    <View style={styles.inputsAndButtonContainer}>
      <View style={styles.inputsContainer}>
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
      </View>
      <View style={styles.buttonAndForgetPasswordContainer}>
        <BasicButton label="تسجيل الدخول" />
        <View style={styles.forgetPasswordAndRememberMeContainer}>
          <Link href={"https://translate.google.com/"}>
            <Text style={styles.forgetButtonText}>نسيت كلمة المرور ؟</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
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
  forgetPasswordAndRememberMeContainer: {
    gap: 10,
    alignItems: "center",
    flex: 1,
  },
  forgetButtonText: {
    fontFamily: "AlmaraiRegular",
    fontSize: 12,
    lineHeight: 20,
    color: colors.main,
  },
});
