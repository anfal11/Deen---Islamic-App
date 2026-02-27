import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bismillahir Rahmanir Raheem</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Quran')}>
        <Text style={styles.buttonText}>📖 Al Quran</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Hadith')}>
        <Text style={styles.buttonText}>📜 Daily Hadith</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dua')}>
        <Text style={styles.buttonText}>🤲 Daily Duas</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0fdf4', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 30, color: '#065f46' },
  button: { backgroundColor: '#10b981', padding: 20, borderRadius: 10, marginBottom: 15, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});