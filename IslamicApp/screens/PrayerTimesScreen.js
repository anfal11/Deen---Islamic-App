import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import * as Location from 'expo-location';

export default function PrayerTimesScreen() {
  const [times, setTimes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      // Location permission chacchi
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        setLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // API theke ajker namazer shomoy anchi
      fetch(`https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=1`)
        .then(res => res.json())
        .then(data => {
          setTimes(data.data.timings);
          setLoading(false);
        })
        .catch(err => {
          setErrorMsg('Failed to fetch prayer times. Check your internet.');
          setLoading(false);
        });
    })();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#10b981" style={{ flex: 1 }} />;
  if (errorMsg) return <View style={styles.container}><Text style={styles.error}>{errorMsg}</Text></View>;

  const prayers = [
    { name: 'Fajr (ফজর)', time: times.Fajr },
    { name: 'Sunrise (সূর্যোদয়)', time: times.Sunrise },
    { name: 'Dhuhr (যোহর)', time: times.Dhuhr },
    { name: 'Asr (আসর)', time: times.Asr },
    { name: 'Maghrib (মাগরিব)', time: times.Maghrib },
    { name: 'Isha (এশা)', time: times.Isha }
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Today's Prayer Times</Text>
      <Text style={styles.subtitle}>Based on your current location</Text>

      {prayers.map((prayer, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.prayerName}>{prayer.name}</Text>
          <Text style={styles.prayerTime}>{prayer.time}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0fdf4', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#065f46', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#047857', textAlign: 'center', marginBottom: 20 },
  card: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#10b981', padding: 20, borderRadius: 10, marginBottom: 15, elevation: 2 },
  prayerName: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  prayerTime: { color: '#d1fae5', fontSize: 18, fontWeight: 'bold' },
  error: { fontSize: 16, color: 'red', textAlign: 'center', marginTop: 50 }
});