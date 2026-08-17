import { StyleSheet, Text, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { AppScreen } from "../../src/components/AppScreen";
import { SectionCard } from "../../src/components/SectionCard";
import { shelters } from "../../src/data/shelters";
import { useLanguage } from "../../src/languages/LanguageContext";
import { colors } from "../../src/theme/colors";

export default function MapScreen() {
  const { t } = useLanguage();

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
              key={shelter.id}
              coordinate={{
                latitude: shelter.latitude,
                longitude: shelter.longitude,
              }}
              title={shelter.name}
              description={shelter.address}
            />
          ))}
        </MapView>
      </View>

      <SectionCard title={t("safePlaces")}>
        <Text style={styles.item}>• {t("shelters")}</Text>
        <Text style={styles.item}>• {t("hospitals")}</Text>
        <Text style={styles.item}>• {t("emergencyServices")}</Text>
      </SectionCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 350,
    borderRadius: 24,
    overflow: "hidden"
  },
  map: {
    width: "100%",
    height: "100%"
  },
  item: {
    color: colors.text,
    fontSize: 16,
    marginBottom: 8
  }
});