import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { AppScreen } from "../../src/components/AppScreen";
import { SectionCard } from "../../src/components/SectionCard";
import { useLanguage } from "../../src/languages/LanguageContext";
import { colors } from "../../src/theme/colors";

type Task = {
  id: number;
  es: string;
  en: string;
  completed: boolean;
};

const initialTasks: Task[] = [
  {
    id: 1,
    es: "Preparar el plan familiar de emergencia",
    en: "Prepare the family emergency plan",
    completed: false,
  },
  {
    id: 2,
    es: "Identificar el refugio temporal más cercano",
    en: "Identify the nearest temporary shelter",
    completed: false,
  },
  {
    id: 3,
    es: "Guardar documentos importantes en un lugar protegido del agua",
    en: "Store important documents in a waterproof location",
    completed: false,
  },
  {
    id: 4,
    es: "Preparar agua potable y alimentos no perecederos",
    en: "Prepare drinking water and non-perishable food",
    completed: false,
  },
  {
    id: 5,
    es: "Revisar el botiquín y medicamentos necesarios",
    en: "Check the first-aid kit and necessary medications",
    completed: false,
  },
  {
    id: 6,
    es: "Preparar linternas, radio y baterías de repuesto",
    en: "Prepare flashlights, radio and spare batteries",
    completed: false,
  },
  {
    id: 7,
    es: "Cargar celulares y baterías portátiles",
    en: "Charge phones and portable batteries",
    completed: false,
  },
  {
    id: 8,
    es: "Retirar o asegurar objetos sueltos del exterior",
    en: "Remove or secure loose outdoor objects",
    completed: false,
  },
  {
    id: 9,
    es: "Revisar instalaciones eléctricas y de gas",
    en: "Check electrical and gas installations",
    completed: false,
  },
  {
    id: 10,
    es: "Definir rutas de evacuación y medio de transporte",
    en: "Define evacuation routes and transportation",
    completed: false,
  },
  {
    id: 11,
    es: "Guardar teléfonos de emergencia y Protección Civil",
    en: "Save emergency and Civil Protection phone numbers",
    completed: false,
  },
  {
    id: 12,
    es: "Revisar los boletines oficiales y el nivel de alerta",
    en: "Check official bulletins and the current alert level",
    completed: false,
  },
];

export default function TasksScreen() {
  const { t, language } = useLanguage();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showTaskOptions, setShowTaskOptions] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const toggleTask = (id: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  };
  const openAddTask = () => {
    setEditingTask(null);
    setNewTask("");
    setShowTaskForm(true);
  };
  const openTaskOptions = (task: Task) => {
    setSelectedTask(task);
    setShowTaskOptions(true);
  };
  const startEditingTask = () => {
    if (!selectedTask) {
      return;
    }
    setEditingTask(selectedTask);
    setNewTask(
      language === "es"
        ? selectedTask.es
        : selectedTask.en
    );
    setShowTaskOptions(false);
    setShowTaskForm(true);
  };
  const saveTask = () => {
    const trimmedTask = newTask.trim();
    if (!trimmedTask) {
      return;
    }
    if (editingTask) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingTask.id
            ? {
                ...task,
                es: trimmedTask,
                en: trimmedTask,
              }
            : task
        )
      );
    } else {
      const task: Task = {
        id: Date.now(),
        es: trimmedTask,
        en: trimmedTask,
        completed: false,
      };
      setTasks((currentTasks) => [
        ...currentTasks,
        task,
      ]);
    }
    setNewTask("");
    setEditingTask(null);
    setSelectedTask(null);
    setShowTaskForm(false);
  };
  const confirmDeleteTask = () => {
    if (!selectedTask) {
      return;
    }
    const taskToDelete = selectedTask;
    setShowTaskOptions(false);
    Alert.alert(
      t("deleteTask"),
      t("deleteTaskConfirm"),
      [
        {
          text: t("cancel"),
          style: "cancel",
        },
        {
          text: t("confirmDelete"),
          style: "destructive",
          onPress: () => {
            setTasks((currentTasks) =>
              currentTasks.filter(
                (task) => task.id !== taskToDelete.id
              )
            );
            setSelectedTask(null);
          },
        },
      ]
    );
  };
  const closeTaskForm = () => {
    setShowTaskForm(false);
    setNewTask("");
    setEditingTask(null);
    setSelectedTask(null);
  };
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;
  const progress =
    tasks.length > 0
      ? (completedTasks / tasks.length) * 100
      : 0;
  return (
    <AppScreen>
      <SectionCard title={t("preparednessTasks")}>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {completedTasks} / {tasks.length}{" "}
            {t("tasksCompleted")}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${progress}%`,
                },
              ]}
            />
          </View>
        </View>
        {tasks.map((task) => (
          <Pressable
            key={task.id}
            style={({ pressed }) => [
              styles.task,
              pressed && styles.taskPressed,
            ]}
            onPress={() => toggleTask(task.id)}
          >
            <Ionicons
              name={
                task.completed
                  ? "checkmark-circle"
                  : "ellipse-outline"
              }
              size={27}
              color={task.completed ? colors.success : colors.mutedText}
            />

            <View style={styles.taskText}>
              <Text style={[styles.title, task.completed && styles.completedTitle,]}>
                {language === "es" ? task.es : task.en}
              </Text>

              <Text style={[ styles.status, task.completed && styles.completedStatus, ]}>
                {task.completed ? t("completed") : t("pending")}
              </Text>
            </View>
            <Pressable
              hitSlop={10}
              onPress={(event) => {
                event.stopPropagation();
                openTaskOptions(task);
              }}
            >
              <Ionicons
                name="ellipsis-vertical"
                size={21}
                color={colors.mutedText}
              />
            </Pressable>
          </Pressable>
        ))}
        <Pressable
          style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed, ]}
          onPress={openAddTask}
        >
          <Ionicons
            name="add-circle-outline"
            size={21}
            color={colors.ocean}
          />

          <Text style={styles.addButtonText}>
            {t("addTask")}
          </Text>
        </Pressable>
      </SectionCard>
      <Modal
        visible={showTaskOptions}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setShowTaskOptions(false)
        }
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowTaskOptions(false)}
        >
          <Pressable
            style={styles.optionsCard}
            onPress={(event) => event.stopPropagation()}
          >
            <Pressable
              style={styles.optionButton}
              onPress={startEditingTask}
            >
              <Ionicons
                name="create-outline"
                size={21}
                color={colors.text}
              />

              <Text style={styles.optionText}>
                {t("editTask")}
              </Text>
            </Pressable>

            <View style={styles.optionDivider} />

            <Pressable
              style={styles.optionButton}
              onPress={confirmDeleteTask}
            >
              <Ionicons
                name="trash-outline"
                size={21}
                color="#c0392b"
              />
              <Text style={styles.deleteOptionText}>
                {t("deleteTask")}
              </Text>
            </Pressable>
            <View style={styles.optionDivider} />
            <Pressable
              style={styles.optionButton}
              onPress={() =>
                setShowTaskOptions(false)
              }
            >
              <Ionicons
                name="close-outline"
                size={21}
                color={colors.mutedText}
              />

              <Text style={styles.cancelOptionText}>
                {t("cancel")}
              </Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
      <Modal
        visible={showTaskForm}
        transparent
        animationType="fade"
        onRequestClose={closeTaskForm}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingTask
                  ? t("editTask")
                  : t("addTask")}
              </Text>

              <Pressable onPress={closeTaskForm}>
                <Ionicons
                  name="close"
                  size={24}
                  color={colors.text}
                />
              </Pressable>
            </View>
            <Text style={styles.inputLabel}>
              {t("taskDescription")}
            </Text>
            <TextInput
              style={styles.input}
              value={newTask}
              onChangeText={setNewTask}
              placeholder={t("taskPlaceholder")}
              placeholderTextColor={
                colors.mutedText
              }
              autoFocus
              multiline
            />
            <View style={styles.modalButtons}>
              <Pressable
                style={styles.cancelButton}
                onPress={closeTaskForm}
              >
                <Text style={styles.cancelButtonText}>
                  {t("cancel")}
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.saveButton,
                  !newTask.trim() &&
                    styles.disabledSaveButton,
                ]}
                onPress={saveTask}
                disabled={!newTask.trim()}
              >
                <Text style={styles.saveButtonText}>
                  {editingTask
                    ? t("saveChanges")
                    : t("saveTask")}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    marginBottom: 12,
    gap: 7
  },
  progressText: {
    color: colors.mutedText,
    fontSize: 13,
    fontWeight: "600"
  },

  progressBar: {
    height: 7,
    backgroundColor: colors.border,
    borderRadius: 10,
    overflow: "hidden"
  },


  progressFill: {
    height: "100%",
    backgroundColor: colors.success,
    borderRadius: 10
  },

  task: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border
  },

  taskPressed: {
    opacity: 0.65
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

  completedTitle: {
    color: colors.mutedText,
    textDecorationLine: "line-through"
  },

  status: {
    color: colors.mutedText,
    fontSize: 13
  },

  completedStatus: {
    color: colors.success,
    fontWeight: "600"
  },
  addButton: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    borderWidth: 1,
    borderColor: colors.ocean,
    borderRadius: 12,
    paddingVertical: 11
  },
  addButtonPressed: {
    opacity: 0.65
  },

  addButtonText: {
    color: colors.ocean,
    fontSize: 14,
    fontWeight: "700"
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    paddingHorizontal: 24
  },

  modalCard: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: 20
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18
  },

  modalTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: "700"
  },

  inputLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 7
  },

  input: {
    minHeight: 90,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.text,
    fontSize: 15,
    textAlignVertical: "top"
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 18
  },
  cancelButton: {
    paddingHorizontal: 14,
    paddingVertical: 10
  },

  cancelButtonText: {
    color: colors.mutedText,
    fontWeight: "600"
  },

  saveButton: {
    backgroundColor: colors.ocean,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 10
  },

  disabledSaveButton: {
    opacity: 0.4
  },

  saveButtonText: {
    color: colors.white,
    fontWeight: "700"
  },
  optionsCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: "hidden"
  },


  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 18,
    paddingVertical: 16
  },
  optionText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600"
  },


  deleteOptionText: {
    color: "#c0392b",
    fontSize: 16,
    fontWeight: "600"
  },
  cancelOptionText: {
    color: colors.mutedText,
    fontSize: 16,
    fontWeight: "600"
  },


  optionDivider: {
    height: 1,
    backgroundColor: colors.border
  }
});