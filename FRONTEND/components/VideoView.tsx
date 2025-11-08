import { useEffect, useRef, useState } from "react";
import { useVideoPlayer, VideoView } from "expo-video";
import { View, StyleSheet } from "react-native";
import IconButton from "./IconButton";
import Animated, {
    FadeIn,
    FadeOut,
    LinearTransition,
} from "react-native-reanimated";

interface VideoViewProps {
    video: string;
    setVideo: React.Dispatch<React.SetStateAction<string>>;
}
export default function VideoViewComponent({
    video,
    setVideo,
}: VideoViewProps) {
    const ref = useRef<VideoView>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const player = useVideoPlayer(video, (player) => {
        player.loop = true;
        player.muted = true;
        player.play();
    });

    useEffect(() => {
        const subscription = player.addListener("playingChange", ({ isPlaying }) => {
            setIsPlaying(isPlaying);
        });

        return () => {
            subscription.remove();
        };
    }, [player]);

    return (
        <Animated.View
            layout={LinearTransition}
            entering={FadeIn}
            exiting={FadeOut}
            style={styles.container}
        >
            <View style={styles.buttonContainer}>
                <IconButton
                    onPress={() => setVideo("")}
                    iosName={"xmark"}
                    androidName="close"
                />
                <IconButton
                    iosName={isPlaying ? "pause" : "play"}
                    androidName={isPlaying ? "pause" : "play"}
                    onPress={() => {
                        if (isPlaying) {
                            player.pause();
                        } else {
                            player.play();
                        }
                    }}
                />
            </View>
            <VideoView
                ref={ref}
                style={styles.video}
                player={player}
                allowsFullscreen
                nativeControls={true}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    video: {
        width: "100%",
        height: "100%",
    },
    buttonContainer: {
        position: "absolute",
        right: 6,
        zIndex: 1,
        paddingTop: 100,
        gap: 16,
    },
});
