import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';

export default function QuranScreen({ navigation }) {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then(res => res.json())
      .then(data => { setSurahs(data.data); setLoading(false); })
      .catch(err => console.error(err));
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#10b981" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      {/* Notun Search Button */}
      <TouchableOpacity style={styles.searchBox} onPress={() => navigation.navigate('Search')}>
        <Text style={styles.searchText}>🔍 Search inside Quran...</Text>
      </TouchableOpacity>

      <FlatList
        data={surahs}
        keyExtractor={(item) => item.number.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.card} 
            onPress={() => navigation.navigate('SurahDetails', { surahNumber: item.number, surahName: item.englishName })}
          >
            <Text style={styles.number}>{item.number}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.englishName} ({item.englishNameTranslation})</Text>
              <Text style={styles.details}>{item.revelationType} - {item.numberOfAyahs} Ayahs</Text>
            </View>
            <Text style={styles.arabic}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0fdf4' },
  searchBox: { backgroundColor: '#d1fae5', margin: 15, padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#10b981' },
  searchText: { color: '#065f46', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  card: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: '#d1fae5', alignItems: 'center' },
  number: { fontSize: 18, fontWeight: 'bold', color: '#10b981', marginRight: 15 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#064e3b' },
  details: { fontSize: 12, color: '#047857', marginTop: 3 },
  arabic: { fontSize: 20, fontWeight: 'bold', color: '#065f46' }
});