import React from "react";
import { View, StyleSheet } from "react-native";
import ResqHeader from "../../components/resq-header";
import ResqBody from "../../components/resq-body";
import ResqFooter from "../../components/resq-footer";
import LeafletMap from "../../components/LeafletMap";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ResqHeader />
      <View style={styles.mapContainer}>
        <LeafletMap />
      </View>
      <ResqBody />
      <ResqFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1.5, // adjust this to control map height
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
