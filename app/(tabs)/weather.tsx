import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "../../src/components/AppScreen";
import { MunicipalityPicker } from "../../src/components/MunicipalityPicker";
import { SectionCard } from "../../src/components/SectionCard";
import {
  municipalities,
  Municipality,
} from "../../src/data/municipalities";
import { useLanguage } from "../../src/languages/LanguageContext";
import { getWeatherConditionKey } from "../../src/services/weatherCodes";
import { CurrentWeather, getCurrentWeather } from "../../src/services/weatherService";
import { colors } from "../../src/theme/colors";

export default function WeatherScreen() {
  const { t } = useLanguage();

  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [municipality, setMunicipality] = useState<Municipality>(
    municipalities[0]
  );

  const [showMunicipalityPicker, setShowMunicipalityPicker] =
    useState(false);

  const loadWeather = useCallback(async () => {
    try {
      setLoading(true);
      setHasError(false);

      const result = await getCurrentWeather(municipality);
      setWeather(result);
    } catch {
      setHasError(true);
    } finally {
      setLoading(false);
    }
  }, [municipality]);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  const condition = weather
    ? t(getWeatherConditionKey(weather.weatherCode) as never)
    : "";

  return (
    <AppScreen>
      <View style={styles.hero}>
        <View style={styles.locationRow}>
          <Text style={styles.location}>
            {municipality.name}, Yucatán
          </Text>
          <View style={styles.locationButtons}>
            <Pressable
              style={styles.changeMunicipalityButton}
              onPress={() => setShowMunicipalityPicker(true)}
            >
              <Text style={styles.changeMunicipalityText}>
                {t("changeMunicipality")}
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.refreshButton,
                loading && styles.disabledButton,
              ]}
              onPress={loadWeather}
              disabled={loading}
            >
              <Ionicons
                name="refresh-outline"
                size={18}
                color={colors.white}
              />
              <Text style={styles.refreshButtonText}>
                {t("refreshWeather")}
              </Text>
            </Pressable>
          </View>
        </View>
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
      <MunicipalityPicker
        visible={showMunicipalityPicker}
        selectedMunicipality={municipality}
        municipalities={municipalities}
        onClose={() => setShowMunicipalityPicker(false)}
        onSelect={setMunicipality}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.ocean,
    borderRadius: 24,
    padding: 26,
    alignItems: "center",
    gap: 10
  },
  locationRow: {
    width: "100%",
    alignItems: "center",
    gap: 8
  },
  location: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "600"
  },

  locationButtons: {
    flexDirection: "row",
    gap: 8
  },

  changeMunicipalityButton: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6
  },

  changeMunicipalityText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "700"
  },

  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6
  },

  disabledButton: {
    opacity: 0.5
  },

  refreshButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "700"
  },

  temperature: {
    color: colors.white,
    fontSize: 62,
    fontWeight: "700"
  },

  condition: {
    color: colors.white,
    fontSize: 16,
    opacity: 0.9,
    textAlign: "center"
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
  },

  loadingText: {
    color: colors.mutedText
  }
});