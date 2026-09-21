import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import MapView, { LongPressEvent, Marker } from "react-native-maps";

import { AppScreen } from "../../src/components/AppScreen";
import { SectionCard } from "../../src/components/SectionCard";
import { shelters } from "../../src/data/shelters";
import { useLanguage } from "../../src/languages/LanguageContext";
import { colors } from "../../src/theme/colors";

type Coordinate = {
  latitude: number;
  longitude: number;
};

type LocationCategory =
  | "shelter"
  | "meeting_point"
  | "hospital"
  | "other";

type CustomLocation = {
  id: number;
  name: string;
  category: LocationCategory;
  latitude: number;
  longitude: number;
  notes: string | null;
  created_at: string;
};

export default function MapScreen() {
  const { t } = useLanguage();
  const db = useSQLiteContext();

  const [customLocations, setCustomLocations] = useState<
    CustomLocation[]
  >([]);
  const [showLocationForm, setShowLocationForm] = useState(false);
  const [locationName, setLocationName] = useState("");
  const [locationNotes, setLocationNotes] = useState("");
  const [locationType, setLocationType] = useState<LocationCategory>("meeting_point");
  const [selectedCoordinate, setSelectedCoordinate] = useState<Coordinate | null>(null);
  useEffect(() => {loadCustomLocations();}, []);
  const loadCustomLocations = async () => {
    try {
      const locations =
        await db.getAllAsync<CustomLocation>(
          `
          SELECT *
          FROM custom_locations
          ORDER BY created_at DESC
          `
        );

      setCustomLocations(locations);
    } catch (error) {
      console.error(
        "Could not load custom locations:",
        error
      );
    }
  };
  const openAddLocation = () => {
    setLocationName("");
    setLocationNotes("");
    setLocationType("meeting_point");
    setSelectedCoordinate(null);
    setShowLocationForm(true);
  };
  const closeLocationForm = () => {
    setShowLocationForm(false);
    setLocationName("");
    setLocationNotes("");
    setLocationType("meeting_point");
    setSelectedCoordinate(null);
  };
  const handleMapLongPress = (
    event: LongPressEvent
  ) => {
    const { latitude, longitude } =
      event.nativeEvent.coordinate;
    setSelectedCoordinate({
      latitude,
      longitude,
    });
  };
  const saveLocation = async () => {
    const trimmedName = locationName.trim();
    if (!trimmedName) {
      return;
    }
    if (!selectedCoordinate) {
      Alert.alert(
        t("selectLocation"),
        t("locationRequired")
      );
      return;
    }
    try {
      await db.runAsync(
        `
        INSERT INTO custom_locations (
          name,
          category,
          latitude,
          longitude,
          notes,
          created_at
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        trimmedName,
        locationType,
        selectedCoordinate.latitude,
        selectedCoordinate.longitude,
        locationNotes.trim() || null,
        new Date().toISOString()
      );
      await loadCustomLocations();
      closeLocationForm();
    } catch (error) {
      console.error(
        "Could not save custom location:",
        error
      );
    }
  };

  const confirmDeleteLocation = (
    location: CustomLocation
  ) => {
    Alert.alert(
      t("deleteLocation"),
      t("deleteLocationConfirm"),
      [
        {
          text: t("cancel"),
          style: "cancel",
        },
        {
          text: t("confirmDelete"),
          style: "destructive",
          onPress: async () => {
            try {
              await db.runAsync(
                `
                DELETE FROM custom_locations
                WHERE id = ?
                `,
                location.id
              );
              await loadCustomLocations();
            } catch (error) {
              console.error(
                "Could not delete custom location:",
                error
              );
            }
          },
        },
      ]
    );
  };

  const getCategoryLabel = (
    category: LocationCategory
  ) => {
    switch (category) {
      case "shelter":
        return t("shelters");
      case "hospital":
        return t("hospitals");
      case "meeting_point":
        return t("meetingPoint");
      default:
        return t("other");
    }
  };

  return (
    <AppScreen>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 20.9674,
            longitude: -89.5926,
            latitudeDelta: 0.18,
            longitudeDelta: 0.18,
          }}
        >
          {shelters.map((shelter) => (
            <Marker
              key={`official-${shelter.id}`}
              coordinate={{
                latitude: shelter.latitude,
                longitude: shelter.longitude,
              }}
              title={shelter.name}
              description={shelter.address}
            />
          ))}
          {customLocations.map((location) => (
            <Marker
              key={`custom-${location.id}`}
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title={location.name}
              description={
                location.notes ||
                t("personalLocation")
              }
              pinColor="orange"
              onCalloutPress={() =>
                confirmDeleteLocation(location)
              }
            />
          ))}
        </MapView>
      </View>

      <SectionCard title={t("safePlaces")}>
        <View style={styles.legendItem}>
          <Ionicons
            name="location"
            size={18}
            color="#e74c3c"
          />
          <Text style={styles.item}> {t("shelters")}</Text>
        </View>
        <View style={styles.legendItem}>
          <Ionicons
            name="location"
            size={18}
            color="#f39c12"
          />
          <Text style={styles.item}>
            {t("personalLocation")}
          </Text>
        </View>
        <Pressable
          style={({ pressed }) => [
            styles.addButton,
            pressed && styles.addButtonPressed,
          ]}
          onPress={openAddLocation}
        >
          <Ionicons
            name="add-circle-outline"
            size={21}
            color={colors.ocean}
          />
          <Text style={styles.addButtonText}>
            {t("addLocation")}
          </Text>
        </Pressable>
      </SectionCard>
      <Modal
        visible={showLocationForm}
        animationType="slide"
        onRequestClose={closeLocationForm}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {t("addLocation")}
            </Text>
            <Pressable
              hitSlop={10}
              onPress={closeLocationForm}
            >
              <Ionicons
                name="close"
                size={26}
                color={colors.text}
              />
            </Pressable>
          </View>
          <Text style={styles.inputLabel}>
            {t("locationName")}
          </Text>
          <TextInput
            style={styles.input}
            value={locationName}
            onChangeText={setLocationName}
            placeholder={t(
              "locationNamePlaceholder"
            )}
            placeholderTextColor={colors.mutedText}
          />
          <Text style={styles.inputLabel}>
            {t("locationType")}
          </Text>
          <View style={styles.categoryContainer}>
            <CategoryButton
              label={t("meetingPoint")}
              selected={
                locationType === "meeting_point"
              }
              onPress={() =>
                setLocationType("meeting_point")
              }
            />
            <CategoryButton
              label={t("shelters")}
              selected={locationType === "shelter"}
              onPress={() =>
                setLocationType("shelter")
              }
            />
            <CategoryButton
              label={t("hospitals")}
              selected={
                locationType === "hospital"
              }
              onPress={() =>
                setLocationType("hospital")
              }
            />
            <CategoryButton
              label={t("other")}
              selected={locationType === "other"}
              onPress={() =>
                setLocationType("other")
              }
            />
          </View>

          <Text style={styles.inputLabel}>
            {t("locationNotes")}
          </Text>

          <TextInput
            style={[styles.input, styles.notesInput]}
            value={locationNotes}
            onChangeText={setLocationNotes}
            placeholder={t(
              "locationNotesPlaceholder"
            )}
            placeholderTextColor={colors.mutedText}
            multiline
          />
          <Text style={styles.selectionTitle}>
            {t("selectLocation")}
          </Text>
          <Text style={styles.selectionHelp}>
            {t("selectLocationHelp")}
          </Text>
          <View style={styles.selectionMapContainer}>
            <MapView
              style={styles.selectionMap}
              initialRegion={{
                latitude: 20.9674,
                longitude: -89.5926,
                latitudeDelta: 0.18,
                longitudeDelta: 0.18,
              }}
              onLongPress={handleMapLongPress}
            >
              {shelters.map((shelter) => (
                <Marker
                  key={`selection-${shelter.id}`}
                  coordinate={{
                    latitude:
                      shelter.latitude,
                    longitude:
                      shelter.longitude,
                  }}
                  title={shelter.name}
                  description={shelter.address}
                />
              ))}
              {selectedCoordinate && (
                <Marker
                  coordinate={selectedCoordinate}
                  pinColor="orange"
                  title={locationName || t(
                    "personalLocation"
                  )}
                />
              )}
            </MapView>
          </View>
          {selectedCoordinate && (
            <View style={styles.locationSelected}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={colors.success}
              />
              <Text
                style={styles.locationSelectedText}
              >
                {t("personalLocation")}
              </Text>
            </View>
          )}
          <View style={styles.modalButtons}>
            <Pressable
              style={styles.cancelButton}
              onPress={closeLocationForm}
            >
              <Text
                style={styles.cancelButtonText}
              >
                {t("cancel")}
              </Text>
            </Pressable>
            <Pressable
              style={[
                styles.saveButton,
                (!locationName.trim() ||
                  !selectedCoordinate) &&
                  styles.disabledButton,
              ]}
              disabled={
                !locationName.trim() ||
                !selectedCoordinate
              }
              onPress={saveLocation}
            >
              <Text style={styles.saveButtonText}>
                {t("saveLocation")}
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </AppScreen>
  );
}
type CategoryButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};
function CategoryButton({
  label,
  selected,
  onPress,
}: CategoryButtonProps) {
  return (
    <Pressable
      style={[
        styles.categoryButton,
        selected &&
          styles.categoryButtonSelected,
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selected &&
            styles.categoryButtonTextSelected,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 500,
    borderRadius: 24,
    overflow: "hidden"
  },
  map: {
    width: "100%",
    height: "100%"
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 8
  },

  item: {
    color: colors.text,
    fontSize: 16
  },
  addButton: {
    marginTop: 12,
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

  modalContainer: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 30
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },

  modalTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "700"
  },

  inputLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 7,
    marginTop: 10
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 11,
    color: colors.text,
    fontSize: 15
  },

  notesInput: {
    minHeight: 65,
    textAlignVertical: "top"
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  categoryButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: 13,
    paddingVertical: 8
  },

  categoryButtonSelected: {
    backgroundColor: colors.ocean,
    borderColor: colors.ocean
  },
  categoryButtonText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600"
  },

  categoryButtonTextSelected: {
    color: colors.white
  },
  selectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 4
  },
  selectionHelp: {
    color: colors.mutedText,
    fontSize: 13,
    marginBottom: 10
  },

  selectionMapContainer: {
    height: 250,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.border
  },
  selectionMap: {
    width: "100%",
    height: "100%"
  },

  locationSelected: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8
  },

  locationSelectedText: {
    color: colors.success,
    fontSize: 13,
    fontWeight: "600"
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 18
  },

  cancelButton: {
    paddingHorizontal: 14,
    paddingVertical: 11
  },
  cancelButtonText: {
    color: colors.mutedText,
    fontWeight: "600"
  },

  saveButton: {
    backgroundColor: colors.ocean,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 11
  },

  disabledButton: {
    opacity: 0.4
  },

  saveButtonText: {
    color: colors.white,
    fontWeight: "700"
  }
});