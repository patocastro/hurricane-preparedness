import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

import { AppScreen } from "../../src/components/AppScreen";
import { SectionCard } from "../../src/components/SectionCard";
import { useLanguage } from "../../src/languages/LanguageContext";
import { colors } from "../../src/theme/colors";

const LINKS = {
  procivy: "https://www.yucatan.gob.mx/procivy/boletin.php",
  noaa: "https://www.nhc.noaa.gov/",
};

type OpenPage = {
  url: string;
  title: string;
};

export default function NewsScreen() {
  const { t } = useLanguage();

  const [openPage, setOpenPage] = useState<OpenPage | null>(null);
  if (openPage) {
    return (
      <SafeAreaView style={styles.browserContainer} edges={["top"]}>
        {/* Header */}
        <View style={styles.browserHeader}>
          <Pressable
            onPress={() => setOpenPage(null)}
            style={({ pressed }) => [
              styles.closeButton,
              pressed && styles.closeButtonPressed,
            ]}
            hitSlop={15}
          >
            <Ionicons
              name="close"
              size={30}
              color={colors.text}
            />
          </Pressable>

          <Text
            style={styles.browserTitle}
            numberOfLines={1}
          >
            {openPage.title}
          </Text>
          <View style={styles.headerSpacer} />
        </View>
        <WebView
          source={{ uri: openPage.url }}
          style={styles.webView}
          startInLoadingState
          javaScriptEnabled
          domStorageEnabled
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator
                size="large"
                color={colors.ocean}
              />
              <Text style={styles.loadingText}>
                Cargando fuente oficial...
              </Text>
            </View>
          )}
        />
      </SafeAreaView>
    );
  }

  return (
    <AppScreen>
      <SectionCard title={t("officialSources")}>
        <Text style={styles.description}>
          {t("officialSourcesDescription")}
        </Text>
        <Pressable
          style={({ pressed }) => [
            styles.sourceCard,
            pressed && styles.sourceCardPressed,
          ]}
          onPress={() =>
            setOpenPage({
              url: LINKS.procivy,
              title: t("procivyTitle"),
            })
          }
        >
          <View style={[styles.iconBox, styles.procivyIcon]}>
            <Ionicons name="shield-checkmark-outline" size={28} color={colors.white} />
          </View>
          <View style={styles.sourceContent}>
            <Text style={styles.sourceTitle}>
              {t("procivyTitle")}
            </Text>

            <Text style={styles.sourceDescription}>
              {t("procivyDescription")}
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={22}
            color={colors.mutedText}
          />
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.sourceCard,
            pressed && styles.sourceCardPressed,
          ]}
          onPress={() =>
            setOpenPage({
              url: LINKS.noaa,
              title: t("noaaTitle"),
            })
          }
        >
          <View style={[styles.iconBox, styles.noaaIcon]}>
            <Ionicons name="cloudy-night-outline" size={28} color={colors.white} />
          </View>
          <View style={styles.sourceContent}>
            <Text style={styles.sourceTitle}>
              {t("noaaTitle")}
            </Text>
            <Text style={styles.sourceDescription}>
              {t("noaaDescription")}
            </Text>
          </View>
          <Ionicons
            name="chevron-forward"
            size={22}
            color={colors.mutedText}
          />
        </Pressable>
      </SectionCard>
      <SectionCard title={t("latestBulletins")}>
        <View style={styles.infoBox}>
          <Ionicons
            name="information-circle-outline"
            size={25}
            color={colors.ocean}
          />
          <Text style={styles.infoText}>
            {t("bulletinsInfo")}
          </Text>
        </View>
      </SectionCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  description: {
    color: colors.mutedText,
    lineHeight: 20,
    marginBottom: 4,
  },
  sourceCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14
  },
  sourceCardPressed: {
    opacity: 0.7
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center"
  },
  procivyIcon: {
    backgroundColor: colors.success
  },
  noaaIcon: {
    backgroundColor: colors.ocean
  },

  sourceContent: {
    flex: 1,
    gap: 4
  },
  sourceTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700"
  },

  sourceDescription: {
    color: colors.mutedText,
    fontSize: 13,
    lineHeight: 18
  },

  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10
  },

  infoText: {
    flex: 1,
    color: colors.text,
    lineHeight: 20
  },
  browserContainer: {
    flex: 1,
    backgroundColor: colors.surface
  },

  browserHeader: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: 8
  },
  closeButton: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24
  },

  closeButtonPressed: {
    backgroundColor: colors.border
  },

  browserTitle: {
    flex: 1,
    textAlign: "center",
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
    paddingHorizontal: 8
  },

  headerSpacer: {
    width: 48
  },

  webView: {
    flex: 1
  },

  loadingContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    gap: 12
  },

  
  loadingText: {
    color: colors.mutedText,
    fontSize: 14
  },
});