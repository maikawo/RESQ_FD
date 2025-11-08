import { CameraMode } from 'expo-camera';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

interface RecordFunctionProps {
    handleTakePicture: () => void;
    cameraMode: CameraMode;
    isRecording: boolean
}

export default function RecordFunction({
    handleTakePicture, 
    cameraMode,
    isRecording,
}: RecordFunctionProps) {
    return (
        <View style={styles.container}>
            {
                cameraMode === 'picture' && (
                    <TouchableOpacity onPress={handleTakePicture} style={styles.pictureButton}>
                        <View style={styles.innerCircle} />
                    </TouchableOpacity>
                )
            }
            {
                cameraMode === 'video' && (
                    <TouchableOpacity
                        onPress={handleTakePicture}
                        style={[
                            styles.videoButton,
                            isRecording && styles.videoButtonRecording
                        ]}
                    >
                        <View
                            style={[
                                styles.innerVideoElement,
                                isRecording && styles.innerVideoElementRecording
                            ]}
                        />
                    </TouchableOpacity>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        bottom: 60,
    },
    pictureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    videoButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 4,
        borderColor: 'white',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    videoButtonRecording: {
        backgroundColor: 'transparent',
    },
    innerVideoElement: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'red',
    },
    innerVideoElementRecording: {
        width: 30,
        height: 30,
        borderRadius: 5,
    },
    innerCircle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'transparent',
    },
});
