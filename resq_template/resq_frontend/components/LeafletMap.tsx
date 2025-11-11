import React, { FC } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";
import type { WebViewMessageEvent } from "react-native-webview/lib/WebViewTypes";

interface LeafletMapProps {
  latitude?: number;
  longitude?: number;
  zoom?: number;
  onMapMessage?: (message: string) => void;
}

const LeafletMap: FC<LeafletMapProps> = ({
  latitude = 13.4767, // 🗺️ Default: Mogpog, Marinduque
  longitude = 121.8614,
  zoom = 13,
  onMapMessage,
}) => {
  const leafletHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Leaflet Map</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
          html, body, #map {
            height: 100%;
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const map = L.map('map').setView([${latitude}, ${longitude}], ${zoom});
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          const marker = L.marker([${latitude}, ${longitude}]).addTo(map);
          marker.bindPopup("<b>Mogpog, Marinduque</b><br>Welcome to the heart of the Philippines!").openPopup();

          map.on('click', function(e) {
            const message = JSON.stringify({
              event: 'mapClick',
              lat: e.latlng.lat,
              lng: e.latlng.lng
            });
            if (window.ReactNativeWebView) {
              window.ReactNativeWebView.postMessage(message);
            }
          });
        </script>
      </body>
    </html>
  `;

  const handleMessage = (event: WebViewMessageEvent) => {
    if (onMapMessage) {
      onMapMessage(event.nativeEvent.data);
    }
  };

  if (Platform.OS === "web") {
    // Web fallback — use iframe
    return (
      <iframe
        src={`data:text/html,${encodeURIComponent(leafletHTML)}`}
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          borderRadius: 8,
        }}
        title="Leaflet Map"
      />
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html: leafletHTML }}
        style={styles.webview}
        onMessage={handleMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
});

export default LeafletMap;
