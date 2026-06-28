import { Ionicons } from "@expo/vector-icons";
import {
    FlatList,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

import type { Municipality } from "../data/municipalities";
import { useLanguage } from "../languages/LanguageContext";
import { colors } from "../theme/colors";

type MunicipalityPickerProps = {
  visible: boolean;
  selectedMunicipality: Municipality;
  municipalities: Municipality[];
  onClose: () => void;
  onSelect: (municipality: Municipality) => void;
};

export function MunicipalityPicker({
  visible,
  selectedMunicipality,
  municipalities,
  onClose,
  onSelect,
}: MunicipalityPickerProps) {
  const { t } = useLanguage();
  function selectMunicipality(municipality: Municipality) {
    onSelect(municipality);
    onClose();
  }
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>{t("selectMunicipality")}</Text>
            <Pressable onPress={onClose} hitSlop={12}>
              <Ionicons name="close" size={26} color={colors.text} />
            </Pressable>
          </View>
          <FlatList
            data={municipalities}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => {
              const isSelected = item.id === selectedMunicipality.id;
              return (
                <Pressable
                  onPress={() => selectMunicipality(item)}
                  style={[
                    styles.item,
                    isSelected && styles.selectedItem,
                  ]}
                >
                  <Text
                    style={[
                      styles.itemText,
                      isSelected && styles.selectedItemText,
                    ]}
                  >
                    {item.name}
                  </Text>

                  {isSelected && (
                    <Ionicons
                      name="checkmark-circle"
                      size={23}
                      color={colors.ocean}
                    />
                  )}
                </Pressable>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.35)"
  },
  sheet: {
    maxHeight: "72%",
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 22,
    paddingBottom: 14
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700"
  },

  list: {
    paddingHorizontal: 16,
    paddingBottom: 30
  },

  item: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    marginBottom: 10,
    paddingHorizontal: 16
  },

  selectedItem: {
    borderColor: colors.ocean,
    backgroundColor: colors.sky
  },
  itemText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "600"
  },
  selectedItemText: {
    color: colors.ocean
  }
});