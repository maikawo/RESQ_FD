import { View } from "react-native";
import IconButton from "./IconButton";
import { FlashMode } from "expo-camera";
import * as React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface CameraToolsProps {
  cameraZoom: number;
  cameraFlash: FlashMode;
  cameraTorch: boolean;
  setCameraZoom: React.Dispatch<React.SetStateAction<number>>;
  setCameraFacing: React.Dispatch<React.SetStateAction<"front" | "back">>;
  setCameraTorch: React.Dispatch<React.SetStateAction<boolean>>;
  setCameraFlash: React.Dispatch<React.SetStateAction<FlashMode>>;
}

export default function CameraTools({
  cameraZoom,
  cameraFlash,
  cameraTorch,
  setCameraZoom,
  setCameraFacing,
  setCameraTorch,
  setCameraFlash,
}: CameraToolsProps) {
  const [isAudioOn, setIsAudioOn] = React.useState(true);

  return (
    <View
      style={{
        position: "absolute",
        top: 60,
        right: 16,
        zIndex: 1,
        gap: 16,
      }}
    >
      <IconButton
        onPress={() =>
          setCameraFacing((prevValue) =>
            prevValue === "back" ? "front" : "back"
          )
        }
        iosName={"arrow.triangle.2.circlepath.camera"}
        androidName="camera-reverse"
        width={25}
        height={21}
      />
      <IconButton
        onPress={() =>
          setCameraFlash((prevValue) => (prevValue === "off" ? "on" : "off"))
        }
        iosName={cameraFlash === "on" ? "bolt.circle" : "bolt.slash.circle"}
        androidName={cameraFlash === "on" ? "flash" : "flash-off"}
      />
      <IconButton
        onPress={() => setIsAudioOn((prev) => !prev)}
        iosName={isAudioOn ? "speaker" : "speaker.slash"}
        androidName={isAudioOn ? "volume-high" : "volume-mute"}
      />
      <IconButton
        onPress={() => setCameraTorch((prevValue) => !prevValue)}
        iosName={
          cameraTorch ? "flashlight.off.circle" : "flashlight.slash.circle"
        }
        androidName={cameraTorch ? "flashlight" : "flashlight-off"}
        library={MaterialCommunityIcons}
      />
    </View>
  );
}
