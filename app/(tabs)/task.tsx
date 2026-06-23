import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

import { AppScreen } from "../../src/components/AppScreen";
import { SectionCard } from "../../src/components/SectionCard";
import { useLanguage } from "../../src/languages/LanguageContext";
import { colors } from "../../src/theme/colors";

const demoTasks = [
  {
    es: "Preparar documentos importantes",
    en: "Prepare important documents",
    completed: true,
  },
  {
    es: "Revisar botiquín de primeros auxilios",
    en: "Check first-aid kit",
    completed: false,
  },
  {
    es: "Definir punto de reunión familiar",
    en: "Define a family meeting point",
    completed: false,
  }
];

export default function TasksScreen() {
  const { t, language } = useLanguage();
  return (
    <AppScreen>
      <SectionCard title={t("preparednessTasks")}>
        {demoTasks.map((task) => (
          <View key={task.es} style={styles.task}>
            <Ionicons
              name={
                task.completed
                  ? "checkmark-circle"
                  : "ellipse-outline"
              }
              size={25}
              color={task.completed ? colors.success : colors.mutedText}
            />
            <View style={styles.taskText}>
              <Text style={styles.title}>
                {language === "es" ? task.es : task.en}
              </Text>

              <Text style={styles.status}>
                {task.completed ? t("completed") : t("pending")}
              </Text>
            </View>
          </View>
        ))}
      </SectionCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },

  taskText: {
    flex: 1,
    gap: 3
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600"
  },
  status: {
    color: colors.mutedText,
    fontSize: 13
  }
});