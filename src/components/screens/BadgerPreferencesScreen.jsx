import React from "react";
import { Text, View, StyleSheet, Switch, ScrollView } from "react-native";
import { usePreferences } from "../context/PreferencesContext";

function BadgerPreferencesScreen() {
  const { preferences, updatePreferences, allTags } = usePreferences();

  const toggleSwitch = (tag) => {
    updatePreferences(tag, !preferences[tag]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>News Preferences</Text>
        <Text style={styles.subheaderText}>
          Toggle the switches to customize which news categories you would like
          to see.
        </Text>
      </View>

      <View style={styles.preferencesContainer}>
        {allTags.map((tag) => (
          <View key={tag} style={styles.preferenceItem}>
            <Text style={styles.preferenceText}>{tag}</Text>
            <Switch
              onValueChange={() => toggleSwitch(tag)}
              value={preferences[tag] || false}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    padding: 16,
    backgroundColor: "white",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subheaderText: {
    fontSize: 16,
    color: "gray",
  },
  preferencesContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    margin: 16,
    marginTop: 0,
  },
  preferenceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  preferenceText: {
    fontSize: 16,
    flex: 1,
  },
});

export default BadgerPreferencesScreen;
