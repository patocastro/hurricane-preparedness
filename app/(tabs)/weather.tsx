import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { useLanguage } from "../../emergency-app/src/i18n/LanguageContext";
import { AppScreen } from "../../src/components/AppScreen";
import { SectionCard } from "../../src/components/SectionCard";
import { colors } from "../../src/theme/colors";

export default function WeatherScreen() {
  const { t } = useLanguage();
  return (
    <AppScreen>
      <View style={styles.hero}>
        <Text style={styles.location}>Mérida, Yucatán</Text>

        <Ionicons
          name="partly-sunny-outline"
          size={76}
          color={colors.white}
        />
        <Text style={styles.temperature}>31°</Text>
        <Text style={styles.condition}>{t("demoWeather")}</Text>
      </View>
      <SectionCard title={t("currentConditions")}>
        <View style={styles.metrics}>
          <View>
            <Text style={styles.metricLabel}>{t("humidity")}</Text>
            <Text style={styles.metricValue}>72%</Text>
          </View>
          <View>
            <Text style={styles.metricLabel}>{t("wind")}</Text>
            <Text style={styles.metricValue}>18 km/h</Text>
          </View>
          <View>
            <Text style={styles.metricLabel}>{t("temperature")}</Text>
            <Text style={styles.metricValue}>31° C</Text>
          </View>
        </View>
      </SectionCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.ocean,
    borderRadius: 24,
    padding: 26,
    alignItems: "center",
    gap: 6
  },
  location: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "600"
  },
  temperature: {
    color: colors.white,
    fontSize: 62,
    fontWeight: "700"
  },

  condition: {
    color: colors.white,
    fontSize: 16,
    opacity: 0.9
  },
  metrics: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  metricLabel: {
    color: colors.mutedText,
    fontSize: 13
  },
  metricValue: {
    color: colors.text,
    fontWeight: "700",
    fontSize: 17,
    marginTop: 4
  }
});