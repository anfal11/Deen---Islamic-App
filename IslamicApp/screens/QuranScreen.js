import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

export default function QuranScreen({ navigation }) {
  const [surahs, setSurahs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.alquran.cloud/v1/surah')
      .then(res => res.json())
      .then(data => { setSurahs(data.data); setLoading(false); })
      .catch(err => console.error(err));
  }, []);

  const filteredSurahs = surahs.filter(surah => 
    surah.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    surah.name.includes(searchQuery) // আরবি সার্চের সাপোর্টও রেখে দিলাম
  );

  if (loading) return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#1E88E5" />
      <Text style={styles.loaderText}>Loading Surah List...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Ayah search button */}
      <TouchableOpacity style={styles.searchBoxAyah} onPress={() => navigation.navigate('Search')}>
        <Text style={styles.searchTextAyah}>🔍 Search word inside Quran...</Text>
      </TouchableOpacity>

      {/* Surah Filter Box */}
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search Surah (আপনার সূরা খুঁজুন)..." 
          placeholderTextColor="#78909C" 
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredSurahs}
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
  container: { flex: 1, backgroundColor: '#F5F9FF' },
  loaderContainer: { flex: 1, backgroundColor: '#F5F9FF', justifyContent: 'center', alignItems: 'center' },
  loaderText: { marginTop: 15, color: '#1E88E5', fontWeight: 'bold' },
  searchBoxAyah: { backgroundColor: '#E1F5FE', margin: 10, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: '#1E88E5' },
  searchTextAyah: { color: '#1565C0', fontSize: 14, fontWeight: 'bold', textAlign: 'center' },
  searchContainer: { paddingHorizontal: 10, paddingBottom: 10 },
  searchInput: { backgroundColor: 'white', padding: 12, borderRadius: 8, fontSize: 16, borderWidth: 1, borderColor: '#BBDEFB', color: '#0D47A1' },
  card: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderColor: '#E1F5FE', alignItems: 'center' },
  number: { fontSize: 18, fontWeight: 'bold', color: '#1E88E5', marginRight: 15 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#0D47A1' },
  details: { fontSize: 12, color: '#1565C0', marginTop: 3 },
  arabic: { fontSize: 20, fontWeight: 'bold', color: '#0D47A1' }
});