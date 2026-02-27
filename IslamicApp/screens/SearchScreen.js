import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, Keyboard } from 'react-native';

export default function SearchScreen() {
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSearch = () => {
    if (!keyword.trim()) return;
    
    setLoading(true);
    setResults([]);
    setMessage('');
    Keyboard.dismiss();

    // Check korchi word ta Bangla naki English
    const isBangla = /[\u0980-\u09FF]/.test(keyword);
    const edition = isBangla ? 'bn.bengali' : 'en.asad';

    fetch(`https://api.alquran.cloud/v1/search/${keyword}/all/${edition}`)
      .then(res => res.json())
      .then(data => {
        if (data.code === 200 && data.data.matches.length > 0) {
          setResults(data.data.matches);
          setMessage(`${data.data.matches.length} results found for "${keyword}"`);
        } else {
          setMessage('No results found. Try a different word.');
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setMessage('Error searching. Check your internet.');
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput 
          style={styles.input} 
          placeholder="Type 'water', 'prayer', ba 'পানি', 'সালাত'..."
          value={keyword}
          onChangeText={setKeyword}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.btn} onPress={handleSearch}>
          <Text style={styles.btnText}>Search</Text>
        </TouchableOpacity>
      </View>
      
      {message ? <Text style={styles.msgText}>{message}</Text> : null}
      
      {loading ? <ActivityIndicator size="large" color="#10b981" style={{ marginTop: 20 }} /> : 
        <FlatList
          data={results}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.surahInfo}>Surah {item.surah.englishName} (Ayah: {item.numberInSurah})</Text>
              <Text style={styles.text}>{item.text}</Text>
            </View>
          )}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0fdf4', padding: 15 },
  searchRow: { flexDirection: 'row', marginBottom: 15 },
  input: { flex: 1, backgroundColor: 'white', paddingHorizontal: 15, borderRadius: 8, borderWidth: 1, borderColor: '#10b981', fontSize: 16 },
  btn: { backgroundColor: '#10b981', justifyContent: 'center', paddingHorizontal: 20, borderRadius: 8, marginLeft: 10 },
  btnText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  msgText: { textAlign: 'center', fontWeight: 'bold', color: '#047857', marginBottom: 10 },
  card: { backgroundColor: 'white', padding: 15, marginBottom: 10, borderRadius: 8, elevation: 2 },
  surahInfo: { color: '#10b981', fontWeight: 'bold', borderBottomWidth: 1, borderColor: '#d1fae5', paddingBottom: 5, marginBottom: 8 },
  text: { fontSize: 16, color: '#374151', lineHeight: 24 }
});