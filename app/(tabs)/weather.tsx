import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";

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

type CachedWeather = {
  id: number;
  location_name: string;
  temperature: number | null;
  humidity: number | null;
  wind_speed: number | null;
  weather_code: number | null;
  updated_at: string;
};

export default function WeatherScreen() {
  const { t } = useLanguage();
  const db = useSQLiteContext();

  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [loading, setLoading] = useState(true);

  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isStale, setIsStale] = useState(false);

  const [municipality, setMunicipality] = useState<Municipality>(
    municipalities[0]
  );

  const [weatherMunicipality, setWeatherMunicipality] =
    useState<Municipality | null>(null);

  const [requestedMunicipality, setRequestedMunicipality] =
    useState<Municipality | null>(null);

  const [showMunicipalityPicker, setShowMunicipalityPicker] =
    useState(false);

  const saveWeatherToCache = async (
    municipalityName: string,
    data: CurrentWeather
  ) => {
    try {
      await db.runAsync(
        `
        DELETE FROM weather_cache
        WHERE location_name = ?
        `,
        municipalityName
      );
      await db.runAsync(
        `
        INSERT INTO weather_cache (
          location_name,
          temperature,
          humidity,
          wind_speed,
          weather_code,
          condition_es,
          condition_en,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        municipalityName,
        data.temperature,
        data.humidity,
        data.windSpeed,
        data.weatherCode,
        "",
        "",
        new Date().toISOString()
      );
    } catch (error) {
      console.log("Could not save weather cache:", error);
    }
  };
  const loadWeatherFromCache = async (
    selectedMunicipality: Municipality
  ): Promise<boolean> => {
    try {
      const cached = await db.getFirstAsync<CachedWeather>(
        `
        SELECT
          id,
          location_name,
          temperature,
          humidity,
          wind_speed,
          weather_code,
          updated_at
        FROM weather_cache
        WHERE location_name = ?
        ORDER BY updated_at DESC
        LIMIT 1
        `,
        selectedMunicipality.name
      );
      if (!cached) {
        return false;
      }
      if (
        cached.temperature === null ||
        cached.humidity === null ||
        cached.wind_speed === null ||
        cached.weather_code === null
      ) {
        return false;
      }
      const cachedWeather: CurrentWeather = {
        temperature: cached.temperature,
        humidity: cached.humidity,
        windSpeed: cached.wind_speed,
        weatherCode: cached.weather_code,
        updatedAt: cached.updated_at
      };
      setWeather(cachedWeather);
      setWeatherMunicipality(selectedMunicipality);
      setLastUpdated(new Date(cached.updated_at));
      setIsStale(true);
      setRequestedMunicipality(null);
      return true;
    } catch (error) {
      console.log("Could not load weather cache:", error);
      return false;
    }
  };

  const loadWeather = useCallback(async () => {
    try {
      setLoading(true);

      const result = await getCurrentWeather(municipality);

      setWeather(result);
      setWeatherMunicipality(municipality);
      setLastUpdated(new Date());
      setIsStale(false);
      setRequestedMunicipality(null);
      await saveWeatherToCache(municipality.name, result);
    } catch (error) {
      console.log("Weather update failed:", error);
      const cacheAvailable = await loadWeatherFromCache(municipality);
      if (!cacheAvailable && weather) {
        setIsStale(true);
      }
    } finally {
      setLoading(false);
    }
  }, [municipality, weather]);
  useEffect(() => {
    loadWeather();
  }, [municipality]);
  const handleMunicipalitySelect = (selected: Municipality) => {
    setRequestedMunicipality(selected);
    setMunicipality(selected);
    setShowMunicipalityPicker(false);
  };
  const condition = weather
    ? t(getWeatherConditionKey(weather.weatherCode) as never)
    : "";

  const formattedLastUpdated = lastUpdated
    ? lastUpdated.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  const displayedMunicipality = weatherMunicipality ?? municipality;
  const municipalityChangedWithoutUpdate =
    isStale &&
    requestedMunicipality &&
    weatherMunicipality &&
    requestedMunicipality.name !== weatherMunicipality.name;

  return (
    <AppScreen>
      <View style={styles.hero}>
        <View style={styles.locationRow}>
          <Text style={styles.location}>
            {displayedMunicipality.name}, Yucatán
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

        {loading && !weather && (
          <ActivityIndicator color={colors.white} />
        )}

        {weather && (
          <>
            <Text style={styles.temperature}>
              {Math.round(weather.temperature)}°
            </Text>

            <Text style={styles.condition}>{condition}</Text>
            {!isStale && lastUpdated && (
              <View style={styles.statusRow}>
                <Ionicons
                  name="time-outline"
                  size={14}
                  color={colors.white}
                />
                <Text style={styles.lastUpdated}>
                  {t("lastUpdated")} {formattedLastUpdated}
                </Text>
              </View>
            )}
            {isStale && (
              <View style={styles.staleContainer}>
                <Ionicons
                  name="warning-outline"
                  size={18}
                  color={colors.white}
                />
                <View style={styles.staleTextContainer}>
                  {municipalityChangedWithoutUpdate &&
                    requestedMunicipality && (
                      <Text style={styles.staleTitle}>
                        {t("municipalityUpdateFailed")}{" "}
                        {requestedMunicipality.name}.
                      </Text>
                    )}
                  <Text style={styles.staleText}>
                    {t("showingLastDataFrom")}{" "}
                    {displayedMunicipality.name}
                    {lastUpdated
                      ? ` · ${t(
                          "lastSuccessfulUpdate"
                        )} ${formattedLastUpdated}`
                      : ""}
                  </Text>
                </View>
              </View>
            )}
          </>
        )}
      </View>

      <SectionCard title={t("currentConditions")}>
        {loading && !weather && (
          <Text style={styles.loadingText}>{t("weatherLoading")}</Text>
        )}

        {weather && (
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
        onSelect={handleMunicipalitySelect}
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
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2
  },

  lastUpdated: {
    color: colors.white,
    fontSize: 12,
    opacity: 0.75
  },
  staleContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.12)"
  },
  staleTextContainer: {
    flex: 1
  },

  staleTitle: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 2
  },

  staleText: {
    color: colors.white,
    fontSize: 12,
    lineHeight: 17,
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
  },

  loadingText: {
    color: colors.mutedText
  }
});