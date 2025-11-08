import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ResqFooter: React.FC = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.text}>© 2025 Resq App. All rights reserved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 50,
    backgroundColor: "#212529",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 14,
  },
});

export default ResqFooter;
