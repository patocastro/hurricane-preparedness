import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

import { AppScreen } from "../../src/components/AppScreen";
import { SectionCard } from "../../src/components/SectionCard";
import { useLanguage } from "../../src/languages/LanguageContext";
import { colors } from "../../src/theme/colors";

const LINKS = {
  procivy: "https://www.yucatan.gob.mx/procivy/boletin.php",
  noaa: "https://www.nhc.noaa.gov/",
};

export default function NewsScreen() {
  const { t } = useLanguage();

  const [webViewUrl, setWebViewUrl] = useState<string | null>(null);

  return (
    <>
      <AppScreen>
        <SectionCard title={t("officialSources")}>
          <Text style={styles.description}>
            {t("officialSourcesDescription")}
          </Text>
          <Pressable
            style={styles.sourceCard}
            onPress={() => setWebViewUrl(LINKS.procivy)}
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
              name="chevron-forward-outline"
              size={22}
              color={colors.mutedText}
            />
          </Pressable>
          <Pressable
            style={styles.sourceCard}
            onPress={() => setWebViewUrl(LINKS.noaa)}
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
              name="chevron-forward-outline"
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
      <Modal
        visible={webViewUrl !== null}
        animationType="slide"
        onRequestClose={() => setWebViewUrl(null)}
      >
        <View style={styles.webViewContainer}>
          <View style={styles.webViewHeader}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setWebViewUrl(null)}
            >
              <Ionicons
                name="close-outline"
                size={28}
                color={colors.text}
              />
            </Pressable>

            <Text style={styles.webViewTitle}>
              Fuente oficial
            </Text>
            <View style={styles.headerSpacer} />
          </View>
          {webViewUrl && (
            <WebView
              source={{ uri: webViewUrl }}
              style={styles.webView}
              startInLoadingState
              javaScriptEnabled
              domStorageEnabled
            />
          )}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  description: {
    color: colors.mutedText,
    lineHeight: 20,
    marginBottom: 4
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
  webViewContainer: {
    flex: 1,
    backgroundColor: colors.surface
  },


  webViewHeader: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },

  webViewTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "700"
  },

  headerSpacer: {
    width: 40
  },

  webView: {
    flex: 1
  }
});