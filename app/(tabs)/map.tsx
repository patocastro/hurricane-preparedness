import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { AppScreen } from "../../src/components/AppScreen";
import { SectionCard } from "../../src/components/SectionCard";
import { useLanguage } from "../../src/languages/LanguageContext";
import { colors } from "../../src/theme/colors";

export default function MapScreen() {
  const { t } = useLanguage();

  return (
    <AppScreen>
      <View style={styles.placeholder}>
        <Ionicons name="map-outline" size={74} color={colors.ocean} />
        <Text style={styles.placeholderTitle}>{t("map")}</Text>
        <Text style={styles.placeholderText}>
          Aquí irá el mapa con refugios, hospitales y puntos de ayuda.
        </Text>
      </View>

      <SectionCard title={t("safePlaces")}>
        <Text style={styles.item}>• {t("shelters")}</Text>
        <Text style={styles.item}>• {t("hospitals")}</Text>
        <Text style={styles.item}>• {t("emergencyServices")}</Text>
      </SectionCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    height: 300,
    backgroundColor: colors.sky,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    padding: 28,
    gap: 10
  },
  placeholderTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "700"
  },
  placeholderText: {
    color: colors.mutedText,
    textAlign: "center",
    lineHeight: 20
  },
  
  item: {
    color: colors.text,
    fontSize: 16,
    marginBottom: 8
  }
});