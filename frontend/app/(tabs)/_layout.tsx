import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import Header from "@/components/home/header/Header";
import { ICONS } from "@/constants/icons";
import { useTheme } from "@/contexts/ThemeContext";
import { View } from "react-native";

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <>
      <Header />
      <Tabs
        screenOptions={{
          headerShown: false,

          tabBarShowLabel: true,
          tabBarActiveTintColor: colors.main,
          tabBarInactiveTintColor: colors.gray400,

          tabBarIconStyle: {
            marginBottom: 5,
          },
          tabBarStyle: {
            width: "100%",
            height: 80,
            backgroundColor: colors.white,
            borderTopWidth: 1,
            borderTopColor: colors.gray200,
            paddingBottom: 25,
            paddingTop: 10,

            // Shadow
            shadowColor: "rgba(0, 0, 0, 0.2)",
            shadowOffset: { width: 0, height: -6 },
            shadowOpacity: 1,
            shadowRadius: 12,
            elevation: 20,
          },
          tabBarLabelStyle: {
            fontFamily: "AlmaraiBold",
            fontSize: 10,
          },
          tabBarItemStyle: {
            height: 70,
            justifyContent: "center",
            alignItems: "center",
          },
        }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title: "الرئيسية",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <ICONS.homeActive width={28} height={28} />
              ) : (
                <ICONS.home width={28} height={28} />
              ),
          }}
        />
        <Tabs.Screen
          name="MyReservations"
          options={{
            title: "حجوزاتي",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <ICONS.reservationsActive width={28} height={28} />
              ) : (
                <ICONS.reservations width={28} height={28} />
              ),
          }}
        />
        <Tabs.Screen
          name="Settings"
          options={{
            title: "الإعدادات",
            tabBarIcon: ({ color, focused }) =>
              focused ? (
                <ICONS.settingsActive width={28} height={28} />
              ) : (
                <ICONS.settings width={28} height={28} />
              ),
          }}
        />
      </Tabs>
    </>
  );
}
