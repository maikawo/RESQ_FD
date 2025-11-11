import React from "react";
import { View, StyleSheet } from "react-native";
import ResqHeader from "../../components/resq-header";
import ResqBody from "../../components/resq-body";
import ResqFooter from "../../components/resq-footer";
import LeafletMap from "../../components/LeafletMap";
import ApexDashboard from "../../components/ApexDashboard";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ResqHeader />

      {/* Map Section */}
      <View style={styles.mapContainer}>
        <LeafletMap />
      </View>

      {/* Analytics Dashboard */}
      <View style={styles.dashboardContainer}>
        <ApexDashboard />
      </View>

      <ResqBody />
      <ResqFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapContainer: {
    flex: 1.5,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  dashboardContainer: {
    flex: 2, // dashboard takes more space to show all charts
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
});
