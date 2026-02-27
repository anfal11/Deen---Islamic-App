import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bismillahir Rahmanir Raheem</Text>
      
      <View style={styles.grid}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Quran')}>
          <Text style={styles.icon}>📖</Text>
          <Text style={styles.cardText}>Al Quran</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Hadith')}>
          <Text style={styles.icon}>📜</Text>
          <Text style={styles.cardText}>Hadith</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Dua')}>
          <Text style={styles.icon}>🤲</Text>
          <Text style={styles.cardText}>Daily Duas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Tasbeeh')}>
          <Text style={styles.icon}>📿</Text>
          <Text style={styles.cardText}>Tasbeeh</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('PrayerTimes')}>
          <Text style={styles.icon}>🕌</Text>
          <Text style={styles.cardText}>Prayer Times</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Qibla')}>
          <Text style={styles.icon}>🧭</Text>
          <Text style={styles.cardText}>Qibla Compass</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#f0fdf4', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#065f46' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { backgroundColor: '#10b981', width: '48%', padding: 25, borderRadius: 15, marginBottom: 15, alignItems: 'center', elevation: 3 },
  icon: { fontSize: 35, marginBottom: 10 },
  cardText: { color: 'white', fontSize: 16, fontWeight: 'bold' }
});