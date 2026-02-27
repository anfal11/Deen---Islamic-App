import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
// JSON file import korchi
import duasData from './duas.json'; 

export default function DuaScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  // Search filter
  const filteredDuas = duasData.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.meaning.includes(searchQuery)
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Total Duas: {duasData.length}</Text>
      
      <TextInput 
        style={styles.searchInput}
        placeholder="Search Dua (e.g. ঘুমানোর, ওজু)..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredDuas.map((d, index) => (
          <View key={d.id} style={styles.card}>
            <Text style={styles.title}>{d.id}. {d.title}</Text>
            <Text style={styles.arabic}>{d.arabic}</Text>
            <Text style={styles.meaning}>{d.meaning}</Text>
          </View>
        ))}
        {filteredDuas.length === 0 && (
          <Text style={styles.noResult}>No Duas found!</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F9FF', padding: 15 },
  headerTitle: { fontSize: 16, fontWeight: 'bold', color: '#1E88E5', textAlign: 'center', marginBottom: 10 },
  searchInput: { backgroundColor: 'white', padding: 12, borderRadius: 8, fontSize: 16, borderWidth: 1, borderColor: '#BBDEFB', marginBottom: 15 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 10, marginBottom: 15, elevation: 3, borderWidth: 1, borderColor: '#E1F5FE' },
  title: { fontSize: 16, fontWeight: 'bold', color: '#1565C0', borderBottomWidth: 1, borderColor: '#E1F5FE', paddingBottom: 5 },
  arabic: { fontSize: 24, textAlign: 'right', marginVertical: 15, color: '#0D47A1', lineHeight: 40 },
  meaning: { fontSize: 15, fontWeight: 'bold', color: '#374151', textAlign: 'justify' },
  noResult: { textAlign: 'center', color: 'red', marginTop: 20, fontSize: 16 }
});