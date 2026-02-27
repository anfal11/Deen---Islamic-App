import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function HadithScreen({ navigation }) {
  const books = [
    { id: 'ben-bukhari', title: 'সহীহ বুখারী', subtitle: 'Sahih al-Bukhari' },
    { id: 'ben-muslim', title: 'সহীহ মুসলিম', subtitle: 'Sahih Muslim' },
    { id: 'ben-abudawud', title: 'সুনানে আবু দাউদ', subtitle: 'Sunan Abu Dawud' },
    { id: 'ben-tirmidhi', title: 'সুনানে তিরমিজি', subtitle: 'Jami at-Tirmidhi' },
    { id: 'ben-nasai', title: 'সুনানে নাসাঈ', subtitle: 'Sunan an-Nasai' },
    { id: 'ben-ibnmajah', title: 'সুনানে ইবনে মাজাহ', subtitle: 'Sunan Ibn Majah' }
  ];

  return (
    <ScrollView style={styles.container}>
      {books.map((book) => (
        <TouchableOpacity 
          key={book.id} 
          style={styles.card}
          onPress={() => navigation.navigate('HadithBookDetails', { bookId: book.id, bookTitle: book.title })}
        >
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.subtitle}>{book.subtitle}</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F9FF', padding: 15 },
  card: { backgroundColor: 'white', padding: 25, borderRadius: 15, marginBottom: 15, alignItems: 'center', elevation: 3, borderWidth: 2, borderColor: '#1E88E5' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0D47A1' },
  subtitle: { fontSize: 16, color: '#1565C0', marginTop: 5, fontStyle: 'italic' },
  bottomSpace: { height: 30 }
});