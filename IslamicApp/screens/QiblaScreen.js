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

      const kaabaLat = 21.422487;
      const kaabaLng = 39.826206;

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

    Magnetometer.setUpdateInterval(100);
    const subscription = Magnetometer.addListener(data => {
      let angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
      angle = angle - 90; 
      setHeading((angle + 360) % 360);
    });

    return () => subscription.remove();
  }, []);

  if (loading) return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#1E88E5" />
      <Text style={styles.loaderText}>Calibrating Compass...</Text>
    </View>
  );

  const rotation = qiblaDirection - heading;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qibla Direction</Text>
      
      <View style={styles.compassCircle}>
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
  container: { flex: 1, backgroundColor: '#F5F9FF', alignItems: 'center', justifyContent: 'center' },
  loaderContainer: { flex: 1, backgroundColor: '#F5F9FF', justifyContent: 'center', alignItems: 'center' },
  loaderText: { marginTop: 15, color: '#1E88E5', fontWeight: 'bold' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#0D47A1', marginBottom: 50 },
  compassCircle: { width: 300, height: 300, borderRadius: 150, borderWidth: 5, borderColor: '#1E88E5', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E1F5FE' },
  arrow: { width: 150, height: 150, resizeMode: 'contain' },
  info: { fontSize: 16, color: '#1565C0', marginTop: 40, fontWeight: 'bold' }
});