import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

import { useLanguage } from "../languages/LanguageContext";
import { colors } from "../theme/colors";

export function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  const nextLanguage = language === "es" ? "en" : "es";

  function changeLanguage() {
    setLanguage(nextLanguage);
  }

  return (
    <Pressable
      onPress={changeLanguage}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
    >
      <Ionicons
        name="language-outline"
        size={16}
        color={colors.white}
      />

      <Text style={styles.text}>
        {language === "es" ? "EN" : "ES"}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.ocean,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
    marginRight: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 5
  },

  buttonPressed: {
    opacity: 0.75
  },

  text: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "700"
  }
});