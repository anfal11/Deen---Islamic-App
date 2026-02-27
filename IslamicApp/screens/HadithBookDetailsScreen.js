import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput } from 'react-native';

export default function HadithBookDetailsScreen({ route }) {
  const { bookId } = route.params;
  const [allHadiths, setAllHadiths] = useState([]);
  const [filteredHadiths, setFilteredHadiths] = useState([]); 
  const [displayHadiths, setDisplayHadiths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const ITEMS_PER_PAGE = 50;

  useEffect(() => {
    fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/${bookId}.json`)
      .then(res => res.json())
      .then(data => {
        const validHadiths = data.hadiths.filter(h => h.text && h.text.trim() !== ""); 
        setAllHadiths(validHadiths);
        setFilteredHadiths(validHadiths);
        setDisplayHadiths(validHadiths.slice(0, ITEMS_PER_PAGE)); 
        setLoading(false);
      }).catch(err => console.error(err));
  }, [bookId]);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = allHadiths.filter(h => h.text.includes(text)); 
    setFilteredHadiths(filtered);
    setPage(1);
    setDisplayHadiths(filtered.slice(0, ITEMS_PER_PAGE));
  };

  const loadMore = () => {
    const nextPage = page + 1;
    const nextData = filteredHadiths.slice(0, nextPage * ITEMS_PER_PAGE);
    setDisplayHadiths(nextData);
    setPage(nextPage);
  };

  if (loading) return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#1E88E5" />
      <Text style={styles.loaderText}>Loading Hadiths...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Search in this book (e.g., পানি, সালাত)..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        data={displayHadiths}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.number}>Hadith No: {item.hadithnumber}</Text>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        )}
        onEndReached={loadMore} 
        onEndReachedThreshold={0.5} 
        ListFooterComponent={
          displayHadiths.length < filteredHadiths.length ? 
          <Text style={styles.footerText}>Loading more...</Text> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F9FF' },
  loaderContainer: { flex: 1, backgroundColor: '#F5F9FF', justifyContent: 'center', alignItems: 'center' },
  loaderText: { marginTop: 15, color: '#1E88E5', fontWeight: 'bold' },
  searchContainer: { padding: 15, backgroundColor: '#1E88E5' },
  searchInput: { backgroundColor: 'white', padding: 10, borderRadius: 8, fontSize: 16 },
  card: { backgroundColor: 'white', padding: 20, margin: 10, borderRadius: 10, elevation: 3, borderWidth: 1, borderColor: '#E1F5FE' },
  number: { fontSize: 15, fontWeight: 'bold', color: '#1E88E5', borderBottomWidth: 1, borderColor: '#E1F5FE', paddingBottom: 5, marginBottom: 10 },
  text: { fontSize: 16, color: '#374151', lineHeight: 24 },
  footerText: { textAlign: 'center', padding: 15, color: '#1E88E5', fontWeight: 'bold' }
});