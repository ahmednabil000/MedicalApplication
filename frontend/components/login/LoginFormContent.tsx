import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

interface Props {
  isSignup: boolean;
  setIsSignup: Dispatch<SetStateAction<boolean>>;
}

export default function LoginFormContent({ isSignup, setIsSignup }: Props) {
  const { colors } = useTheme();
  const styles = React.useMemo(() => getStyles(colors), [colors]);

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tabButton, !isSignup && styles.activeTabButton]}
          onPress={() => {
            setIsSignup(false);
          }}
        >
          <Text style={[styles.tabButtonText, !isSignup && styles.activeTabButtonText]}>
            تسجيل الدخول
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, isSignup && styles.activeTabButton]}
          onPress={() => {
            setIsSignup(true);
          }}
        >
          <Text style={[styles.tabButtonText, isSignup && styles.activeTabButtonText]}>
            انشاء حساب
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.formContentContainer}>
        {!isSignup && <LoginForm />}
        {isSignup && <SignupForm />}
      </ScrollView>
    </View>
  );
}

const getStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  tabsContainer: {
    flex: 1,
    gap: 10,
    padding: 10,
    borderRadius: 20,
    flexDirection: "row",
    backgroundColor: colors.gray10,
    maxHeight: 65,
  },
  tabButton: {
    padding: 10,
    flex: 1,
    gap: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabButton: {
    backgroundColor: colors.main,
  },
  tabButtonText: {
    fontFamily: "AlmaraiRegular",
    fontSize: 16,
    color: colors.gray700,
    lineHeight: 20,
  },
  activeTabButtonText: {
    color: colors.white,
  },
  formContentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    flex: 1,
  },
});
