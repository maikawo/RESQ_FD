import React from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import ResqFooter from "./components/resq-footer";
import ResqHeader from "./components/resq-header";

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ResqHeader />
      <View style={styles.body}>{/* Main content here */}</View>
      <ResqFooter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
