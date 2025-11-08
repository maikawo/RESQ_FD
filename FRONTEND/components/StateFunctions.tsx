import * as React from "react";
import { StyleSheet, Pressable, View, Text } from "react-native";
import { CameraMode } from "expo-camera";

const FONT_SIZE = 15;
const ACTIVE_COLOR = "#FFD300"; 
const INACTIVE_COLOR = "white";
const ACTIVE_BACKGROUND_COLOR = "rgba(0, 0, 0, 0.25)"; 

interface StateFunctionsProps {
  cameraMode: CameraMode;
  setCameraMode: React.Dispatch<React.SetStateAction<CameraMode>>;
}

export default function StateFunctions({
  cameraMode,
  setCameraMode,
}: StateFunctionsProps) {
  return (
    <View style={styles.bottomContainer}>
      <View style={styles.directionRowItemsCenter}>
        {}
        <Pressable
          onPress={() => setCameraMode("picture")}
          style={[
            styles.modeButton,
            cameraMode === "picture" && styles.activeModeButton,
          ]}
        >
          <Text
            style={{
              fontWeight: cameraMode === "picture" ? "bold" : "400",
              fontSize: FONT_SIZE,
              color: cameraMode === "picture" ? ACTIVE_COLOR : INACTIVE_COLOR,
            }}
          >
            PICTURE
          </Text>
        </Pressable>

        {}
        <Pressable
          onPress={() => setCameraMode("video")}
          style={[
            styles.modeButton,
            cameraMode === "video" && styles.activeModeButton,
          ]}
        >
          <Text
            style={{
              fontWeight: cameraMode === "video" ? "bold" : "400",
              fontSize: FONT_SIZE,
              color: cameraMode === "video" ? ACTIVE_COLOR : INACTIVE_COLOR,
            }}
          >
            VIDEO
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  directionRowItemsCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bottomContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    alignSelf: "center",
    bottom: 20,
  },
  modeButton: {
    paddingVertical: 8,
    paddingHorizontal: 17,
    borderRadius: 20,
  },
  activeModeButton: {
    backgroundColor: ACTIVE_BACKGROUND_COLOR,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
  },
});