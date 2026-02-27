import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Magnetometer } from 'expo-sensors';
import * as Location from 'expo-location';

export default function QiblaScreen() {
  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Kaaba er location (Makkah)
      const kaabaLat = 21.422487;
      const kaabaLng = 39.826206;

      // Math for Qibla Direction
      const PI = Math.PI;
      const lat1 = latitude * PI / 180;
      const lat2 = kaabaLat * PI / 180;
      const dLng = (kaabaLng - longitude) * PI / 180;

      const y = Math.sin(dLng) * Math.cos(lat2);
      const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
      let brng = Math.atan2(y, x) * 180 / PI;
      setQiblaDirection((brng + 360) % 360);
      setLoading(false);
    })();

    // Compass sensor read kora
    Magnetometer.setUpdateInterval(100);
    const subscription = Magnetometer.addListener(data => {
      let angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
      angle = angle - 90; // Adjust for screen orientation
      setHeading((angle + 360) % 360);
    });

    return () => subscription.remove();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#10b981" style={{ flex: 1 }} />;

  // Arrow ghurabe Qibla er dikey
  const rotation = qiblaDirection - heading;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qibla Direction</Text>
      
      <View style={styles.compassCircle}>
        {/* Kaaba Image ghurbe na, arrow ghurbe */}
        <Image 
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3069/3069324.png' }} 
          style={[styles.arrow, { transform: [{ rotate: `${rotation}deg` }] }]} 
        />
      </View>

      <Text style={styles.info}>Rotate your phone to align the arrow</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0fdf4', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#065f46', marginBottom: 50 },
  compassCircle: { width: 300, height: 300, borderRadius: 150, borderWidth: 5, borderColor: '#10b981', alignItems: 'center', justifyContent: 'center' },
  arrow: { width: 150, height: 150, resizeMode: 'contain' },
  info: { fontSize: 16, color: '#047857', marginTop: 40, fontWeight: 'bold' }
});