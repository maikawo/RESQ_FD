import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ResqHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>RESQ App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "#0d6efd",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ResqHeader;
