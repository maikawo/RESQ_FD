import * as React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

import { CameraMode, CameraView, FlashMode } from 'expo-camera';
// import * as Location from 'expo-location'; // <-- Location removed

import StateFunctions from '@/components/StateFunctions';
import RecordFunction from '@/components/RecordFunction';
import CameraTools from '@/components/CameraTools';
import PictureView from '@/components/PictureView';
import VideoViewComponent from '@/components/VideoView';

// <-- Location type removed

export default function HomeScreen() {
  const cameraRef = React.useRef<CameraView>(null);
  const [cameraMode, setCameraMode] = React.useState<CameraMode>('picture');

  const [cameraZoom, setCameraZoom] = React.useState<number>(0);
  const [cameraTorch, setCameraTorch] = React.useState<boolean>(false);
  const [cameraFlash, setCameraFlash] = React.useState<FlashMode>("off");
  const [cameraFacing, setCameraFacing] = React.useState<"front" | "back">(
    "back"
  );

  const [picture, setPicture] = React.useState<string>("");
  const [video, setVideo] = React.useState<string>("");
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // <-- Location state removed
  // <-- useEffect for location permissions removed

  async function handleTakePicture() {
    const response = await cameraRef.current?.takePictureAsync({});
    setPicture(response!.uri);
  }

  async function toggleRecord() {
    if (isRecording) {
      cameraRef.current?.stopRecording();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      const response = await cameraRef.current?.recordAsync();
      setVideo(response!.uri);
    }
  }

  return (
    <Animated.View
      layout={LinearTransition}
      style={{ flex: 1 }}
    >
      <CameraView
        ref={cameraRef}
        mode={cameraMode}
        zoom={cameraZoom}
        flash={cameraFlash}
        enableTorch={cameraTorch}
        facing={cameraFacing}
        style={styles.camera}
        onCameraReady={() => console.log("camera is ready")}
      />
      <SafeAreaView style={styles.uiContainerAbsolute}>
        {(!picture && !video) && (
          <Animated.View style={styles.uiContainer} entering={FadeIn} exiting={FadeOut}>
            <CameraTools
              cameraZoom={cameraZoom}
              cameraFlash={cameraFlash}
              cameraTorch={cameraTorch}
              setCameraZoom={setCameraZoom}
              setCameraFacing={setCameraFacing}
              setCameraTorch={setCameraTorch}
              setCameraFlash={setCameraFlash}
            />
            <RecordFunction
              cameraMode={cameraMode}
              handleTakePicture={
                cameraMode === 'picture' ? handleTakePicture : toggleRecord
              }
              isRecording={isRecording}
            />
            <StateFunctions
              setCameraMode={setCameraMode}
              cameraMode={cameraMode} />
          </Animated.View>
        )}
      </SafeAreaView>

      {/* <-- Location prop removed from PictureView --> */}
      {picture && (
        <View style={StyleSheet.absoluteFill}>
          <PictureView 
            picture={picture} 
            setPicture={setPicture} 
          />
        </View>
      )}

      {/* <-- Location prop removed from VideoViewComponent --> */}
      {video && (
        <View style={StyleSheet.absoluteFill}>
          <VideoViewComponent 
            video={video} 
            setVideo={setVideo} 
            // location={location} // You will need to update VideoViewComponent as well
          />
        </View>
      )}
    </Animated.View>
  );
}

// --- Styles (unchanged) ---
const styles = StyleSheet.create({
  uiContainerAbsolute: {
    ...StyleSheet.absoluteFillObject,
  },
  uiContainer: {
    flex: 1,
    paddingHorizontal: 6,
    justifyContent: 'flex-end',
  },
  camera: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  }
});