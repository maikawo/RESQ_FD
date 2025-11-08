import React from "react";
import { View, StyleSheet } from "react-native";
import ResqHeader from "../../components/resq-header";
import ResqBody from "../../components/resq-body";
import ResqFooter from "../../components/resq-footer";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ResqHeader />
      <ResqBody />
      <ResqFooter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
