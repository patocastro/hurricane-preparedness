import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";

import { migrateDbIfNeeded } from "../src/db/migrations";
import { LanguageProvider } from "../src/languages/LanguageContext";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="emergency.db" onInit={migrateDbIfNeeded}>
      <LanguageProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </LanguageProvider>
    </SQLiteProvider>
  );
}