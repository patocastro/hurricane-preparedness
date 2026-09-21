import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../src/theme/colors";
import { useLanguage } from "../../src/languages/LanguageContext";
import { LanguageSwitch } from "../../src/components/LanguageSwitch";


export default function TabsLayout() {
  const { t } = useLanguage();
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
            backgroundColor: colors.navy,
        },
        headerTintColor: colors.white,

        headerRight: () => <LanguageSwitch />,

        tabBarActiveTintColor: colors.ocean,
        tabBarInactiveTintColor: colors.mutedText,
        tabBarStyle: {
            backgroundColor: colors.white,
            borderTopColor: colors.border,
        },
        }}
    >
      <Tabs.Screen
        name="weather"
        options={{
          title: t("weather"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="partly-sunny-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="news"
        options={{
          title: t("news"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="megaphone-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="task"
        options={{
          title: t("tasks"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkmark-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: t("map"),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}