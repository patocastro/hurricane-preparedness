import { Ionicons } from "@expo/vector-icons";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

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
  async function openLink(url: string) {
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  }

  return (
    <AppScreen>
      <SectionCard title={t("officialSources")}>
        <Text style={styles.description}>
          {t("officialSourcesDescription")}
        </Text>
        <Pressable
          style={styles.sourceCard}
          onPress={() => openLink(LINKS.procivy)}
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
            name="open-outline"
            size={22}
            color={colors.mutedText}
          />
        </Pressable>
        <Pressable
          style={styles.sourceCard}
          onPress={() => openLink(LINKS.noaa)}
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
            name="open-outline"
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
  }
});