import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HadithScreen({ navigation }) {
 const books = [
    { id: 'ben-bukhari', title: 'Sahih al-Bukhari (Bangla)', subtitle: 'Imam Bukhari' },
    { id: 'ben-muslim', title: 'Sahih Muslim (Bangla)', subtitle: 'Imam Muslim' }
  ];

  return (
    <View style={styles.container}>
      {books.map((book) => (
        <TouchableOpacity 
          key={book.id} 
          style={styles.card}
          onPress={() => navigation.navigate('HadithBookDetails', { bookId: book.id, bookTitle: book.title })}
        >
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.subtitle}>By {book.subtitle}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0fdf4', padding: 15 },
  card: { backgroundColor: '#10b981', padding: 25, borderRadius: 15, marginBottom: 15, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', color: 'white' },
  subtitle: { fontSize: 16, color: '#d1fae5', marginTop: 5 }
});