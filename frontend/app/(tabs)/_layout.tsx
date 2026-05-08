import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import Header from "@/components/home/header/Header";
import { ICONS } from "@/constants/icons";
import { Colors } from "@/constants/theme";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <>
<Header/>
    <Tabs
      screenOptions={{
        headerShown: false,
        
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.main,
        tabBarInactiveTintColor: Colors.gray400,
     
        tabBarIconStyle: {
          marginBottom: 5,
        },
        tabBarStyle: {
          alignSelf: "center",
          width: 260,
          height: 70,
          marginBottom: 20,
          backgroundColor: Colors.white,
          borderRadius: 50,
          borderWidth: 1,
          borderColor: Colors.gray200, 
          paddingBottom: 10,
          paddingTop: 5,
          // Shadow
          shadowColor: "rgba(0, 0, 0, 0.25)",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 4,
          elevation: 4,
          borderTopWidth: 1,
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
          tabBarIcon: ({ color, focused }) => (
            focused?<ICONS.homeActive width={28} height={28} /> : <ICONS.home width={28} height={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="MyReservations"
        options={{
          title: "حجوزاتي",
          tabBarIcon: ({ color, focused }) => (
            focused?<ICONS.reservationsActive width={28} height={28} /> : <ICONS.reservations width={28} height={28} />
          ),
        }}
      />
      <Tabs.Screen
        name="Settings"
        options={{
          title: "الإعدادات",
          tabBarIcon: ({ color, focused }) => (
            focused?<ICONS.settingsActive width={28} height={28} /> : <ICONS.settings width={28} height={28} />
          ),
        }}
      />
    </Tabs>
        </>
  );
}
