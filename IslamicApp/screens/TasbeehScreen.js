import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from 'react-native';

export default function TasbeehScreen() {
  const [count, setCount] = useState(0);

  const handlePress = () => {
    setCount(count + 1);
    // Protibar 33 bar hole ektu vibrate korbe
    if ((count + 1) % 33 === 0) {
      Vibration.vibrate(100); 
    }
  };

  const handleReset = () => {
    setCount(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tasbeeh Counter</Text>
      
      <Text style={styles.subtitle}>Subhanallah • Alhamdulillah • Allahu Akbar</Text>

      <TouchableOpacity style={styles.counterButton} onPress={handlePress} activeOpacity={0.7}>
        <Text style={styles.countText}>{count}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetText}>Reset (0)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0fdf4', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#065f46', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#047857', marginBottom: 50, fontStyle: 'italic' },
  counterButton: { 
    width: 200, 
    height: 200, 
    borderRadius: 100, 
    backgroundColor: '#10b981', 
    alignItems: 'center', 
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5
  },
  countText: { fontSize: 60, fontWeight: 'bold', color: 'white' },
  resetButton: { marginTop: 40, paddingHorizontal: 30, paddingVertical: 12, backgroundColor: '#ef4444', borderRadius: 25 },
  resetText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});