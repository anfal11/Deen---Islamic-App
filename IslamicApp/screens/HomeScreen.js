import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';

export default function HomeScreen({ navigation }) {
  // HomeScreen grid cards data
  const menuItems = [
    { id: 1, name: 'Al Quran', icon: '📖', route: 'Quran', color: '#1E88E5' },
    { id: 2, name: 'Hadith', icon: '📜', route: 'Hadith', color: '#29B6F6' },
    { id: 3, name: 'Daily Duas', icon: '🤲', route: 'Dua', color: '#4FC3F7' },
    { id: 4, name: 'Tasbeeh', icon: '📿', route: 'Tasbeeh', color: '#1E88E5' },
    { id: 5, name: 'Prayer Times', icon: '🕌', route: 'PrayerTimes', color: '#29B6F6' },
    { id: 6, name: 'Qibla', icon: '🧭', route: 'Qibla', color: '#4FC3F7' }
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header section with background */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to</Text>
        <Text style={styles.appName}>Deen - Al Islam</Text>
        <Text style={styles.bismillahText}>Bismillahir Rahmanir Raheem</Text>
      </View>

      {/* Feature grid */}
      <View style={styles.grid}>
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.card, { borderTopColor: item.color }]} 
            onPress={() => navigation.navigate(item.route)}
          >
            <View style={styles.cardContent}>
              <Text style={styles.icon}>{item.icon}</Text>
              <Text style={styles.cardText}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#F5F9FF' },
  header: { backgroundColor: '#1E88E5', padding: 25, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, marginBottom: 20, elevation: 5 },
  welcomeText: { color: 'white', fontSize: 16 },
  appName: { color: 'white', fontSize: 32, fontWeight: 'bold' },
  bismillahText: { color: '#E1F5FE', fontSize: 18, marginTop: 10, fontStyle: 'italic' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 15 },
  card: { backgroundColor: 'white', width: '48%', paddingVertical: 20, paddingHorizontal: 10, borderRadius: 15, marginBottom: 15, alignItems: 'center', elevation: 3, borderTopWidth: 4 },
  cardContent: { alignItems: 'center' },
  icon: { fontSize: 40, marginBottom: 10 },
  cardText: { color: '#1565C0', fontSize: 16, fontWeight: 'bold' }
});