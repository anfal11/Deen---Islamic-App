import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TextInput } from 'react-native';

export default function HadithBookDetailsScreen({ route }) {
  const { bookId } = route.params;
  const [allHadiths, setAllHadiths] = useState([]);
  const [filteredHadiths, setFilteredHadiths] = useState([]); // Search er por je gulo thakbe
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

  // Search korar function
  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = allHadiths.filter(h => h.text.includes(text)); // text match korle anbe
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

  if (loading) return <ActivityIndicator size="large" color="#10b981" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      {/* Hadith Search Bar */}
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
  container: { flex: 1, backgroundColor: '#f0fdf4' },
  searchContainer: { padding: 15, backgroundColor: '#10b981' },
  searchInput: { backgroundColor: 'white', padding: 10, borderRadius: 8, fontSize: 16 },
  card: { backgroundColor: 'white', padding: 20, margin: 10, borderRadius: 10, elevation: 2 },
  number: { fontSize: 14, fontWeight: 'bold', color: '#10b981', borderBottomWidth: 1, borderColor: '#d1fae5', paddingBottom: 5, marginBottom: 10 },
  text: { fontSize: 16, color: '#374151', lineHeight: 24 },
  footerText: { textAlign: 'center', padding: 15, color: '#10b981', fontWeight: 'bold' }
});