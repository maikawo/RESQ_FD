import { Image } from 'expo-image';
import * as React from 'react';
import { View, Pressable, StyleSheet, Text, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn } from 'react-native-reanimated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

// The API endpoint on your Render server
const API_REPORT_URL = "https://resq-proj.onrender.com/api/reports";

// 1. Location prop is removed
interface PictureViewProps {
  picture: string;
  setPicture: React.Dispatch<React.SetStateAction<string>>;
}

export default function PictureView({ picture, setPicture }: PictureViewProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);

  // 2. handleSend is updated to not send location
  const handleSend = async () => {
    if (!picture) {
      Alert.alert("Error", "No picture to send.");
      return;
    }

    setIsUploading(true);

    // Create the FormData object
    const formData = new FormData();

    // Append the image file
    const uriParts = picture.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const fileName = `report.${fileType}`;

    formData.append('media', {
      uri: picture,
      name: fileName,
      type: `image/${fileType}`, 
    } as any); 

    // 3. Location data is no longer appended

    // 4. Send the request
    try {
      const response = await fetch(API_REPORT_URL, {
        method: 'POST',
        body: formData,
        headers: {
          // 'Content-Type' is set automatically by fetch
        },
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to send report.");
      }

      // --- SUCCESS! ---
      console.log("Backend response:", responseData);
      Alert.alert(
        "✅ Report Sent",
        "Your image has been received for testing."
      );
      
      setPicture(''); // Go back to camera

    } catch (error: any) {
      console.error("Error sending report:", error);
      Alert.alert("❌ Error", error.message || "Could not send report.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Animated.View
      style={styles.container}
      entering={imageLoaded ? FadeIn.duration(200) : undefined}
    >
      <Image
        source={picture}
        style={styles.image}
        onLoadEnd={() => setImageLoaded(true)}
      />
      {imageLoaded && (
        <View style={StyleSheet.absoluteFill}>
          <Pressable
            style={styles.backButton}
            onPress={() => setPicture('')}
          >
            <MaterialCommunityIcons name="close" size={26} color="#FFFFFF" />
          </Pressable>

          <View style={styles.sendButtonContainer}>
            <Pressable
              style={styles.sendButton}
              onPress={handleSend}
              disabled={isUploading}
            >
              <LinearGradient
                colors={['#FF6F37', '#E62E00']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.gradient}
              />
              <View style={styles.topInnerShadow} />
              <View style={styles.bottomInnerShadow} />
              <Text style={styles.sendButtonText}>
                {isUploading ? 'Sending...' : 'Send'}
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </Animated.View>
  );
}

// --- Styles (unchanged) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  sendButtonContainer: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
  sendButton: {
    width: 127,
    height: 48,
    borderRadius: 29.45,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    zIndex: 1,
  },
  topInnerShadow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 29.45,
    ...Platform.select({
      ios: {
        shadowColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 1,
      },
      android: {},
    }),
  },
  bottomInnerShadow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 29.45,
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
      },
      android: {},
    }),
  },
});