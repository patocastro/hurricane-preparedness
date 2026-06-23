import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { AppScreen } from "../../src/components/AppScreen";
import { SectionCard } from "../../src/components/SectionCard";
import { useLanguage } from "../../src/i18n/LanguageContext";
import { colors } from "../../src/theme/colors";

export default function NewsScreen() {
  const { t } = useLanguage();

  return (
    <AppScreen>
      <SectionCard title={t("latestBulletins")}>
        <View style={styles.alert}>
          <Ionicons name="information-circle" size={28} color={colors.ocean} />
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>{t("demoBulletinTitle")}</Text>
            <Text style={styles.alertText}>{t("demoBulletinContent")}</Text>
            <Text style={styles.source}>{t("officialInformation")}</Text>
          </View>
        </View>
      </SectionCard>
      <SectionCard title={t("news")}>
        <Text style={styles.empty}>{t("noBulletins")}</Text>
      </SectionCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  alert: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start"
  },
  alertContent: {
    flex: 1,
    gap: 5
  },
  
  alertTitle: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "700"
  },

  alertText: {
    color: colors.text,
    lineHeight: 20
  },

  source: {
    color: colors.ocean,
    fontWeight: "600",
    marginTop: 4
  },
  empty: {
    color: colors.mutedText
  }
});