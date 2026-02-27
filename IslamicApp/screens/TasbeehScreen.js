import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from 'react-native';

export default function TasbeehScreen() {
  const [count, setCount] = useState(0);

  const handlePress = () => {
    setCount(count + 1);
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
  container: { flex: 1, backgroundColor: '#F5F9FF', alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#0D47A1', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#1565C0', marginBottom: 50, fontStyle: 'italic' },
  counterButton: { 
    width: 200, 
    height: 200, 
    borderRadius: 100, 
    backgroundColor: '#1E88E5', 
    alignItems: 'center', 
    justifyContent: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5
  },
  countText: { fontSize: 60, fontWeight: 'bold', color: 'white' },
  resetButton: { marginTop: 40, paddingHorizontal: 30, paddingVertical: 12, backgroundColor: '#D32F2F', borderRadius: 25 },
  resetText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});