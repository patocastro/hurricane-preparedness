import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "../../src/components/AppScreen";
import { SectionCard } from "../../src/components/SectionCard";
import { useLanguage } from "../../src/languages/LanguageContext";
import { getWeatherConditionKey } from "../../src/services/weatherCodes";
import { CurrentWeather, getCurrentWeather } from "../../src/services/weatherService";
import { colors } from "../../src/theme/colors";

export default function WeatherScreen() {
  const { t } = useLanguage();

  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function loadWeather() {
      try {
        setLoading(true);
        setHasError(false);

        const result = await getCurrentWeather();
        setWeather(result);
      } catch {
        setHasError(true);
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, []);

  const condition = weather
    ? t(getWeatherConditionKey(weather.weatherCode) as never)
    : "";

  return (
    <AppScreen>
      <View style={styles.hero}>
        <Text style={styles.location}>Mérida, Yucatán</Text>

        <Ionicons
          name="partly-sunny-outline"
          size={76}
          color={colors.white}
        />

        {loading && <ActivityIndicator color={colors.white} />}

        {hasError && (
          <Text style={styles.condition}>{t("weatherError")}</Text>
        )}

        {!loading && !hasError && weather && (
          <>
            <Text style={styles.temperature}>
              {Math.round(weather.temperature)}°
            </Text>

            <Text style={styles.condition}>{condition}</Text>
          </>
        )}
      </View>

      <SectionCard title={t("currentConditions")}>
        {loading && (
          <Text style={styles.loadingText}>{t("weatherLoading")}</Text>
        )}

        {!loading && !hasError && weather && (
          <View style={styles.metrics}>
            <View>
              <Text style={styles.metricLabel}>{t("humidity")}</Text>
              <Text style={styles.metricValue}>{weather.humidity}%</Text>
            </View>

            <View>
              <Text style={styles.metricLabel}>{t("wind")}</Text>
              <Text style={styles.metricValue}>
                {Math.round(weather.windSpeed)} km/h
              </Text>
            </View>

            <View>
              <Text style={styles.metricLabel}>{t("temperature")}</Text>
              <Text style={styles.metricValue}>
                {Math.round(weather.temperature)}° C
              </Text>
            </View>
          </View>
        )}
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
    marginTop: 4,
  },

  loadingText: {
    color: colors.mutedText,
  }
});