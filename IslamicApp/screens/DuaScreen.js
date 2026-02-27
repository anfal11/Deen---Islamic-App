import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export default function DuaScreen() {
  const duas = [
    { id: 1, title: "Waking Up", arabic: "الْحَمْدُ للهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ", meaning: "All praise is for Allah who gave us life after having taken it from us and unto Him is the resurrection." },
    { id: 2, title: "Before Eating", arabic: "بِسْمِ اللَّهِ وَبَرَكَةِ اللَّهِ", meaning: "In the name of Allah and with the blessings of Allah I begin (eating)." },
    { id: 3, title: "For Forgiveness", arabic: "رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ", meaning: "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers." },
    { id: 4, title: "For Knowledge", arabic: "رَبِّ زِدْنِي عِلْمًا", meaning: "O my Lord, increase me in knowledge." },
    { id: 5, title: "Leaving the House", arabic: "بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ", meaning: "In the name of Allah, I place my trust in Allah, and there is no might nor power except with Allah." },
    { id: 6, title: "For Parents", arabic: "رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا", meaning: "My Lord, have mercy upon them as they brought me up [when I was] small." }
  ];

  return (
    <ScrollView style={styles.container}>
      {duas.map((d) => (
        <View key={d.id} style={styles.card}>
          <Text style={styles.title}>{d.title}</Text>
          <Text style={styles.arabic}>{d.arabic}</Text>
          <Text style={styles.meaning}>{d.meaning}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0fdf4', padding: 15 },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 10, marginBottom: 15, elevation: 3 },
  title: { fontSize: 16, fontWeight: 'bold', color: '#047857', borderBottomWidth: 1, borderColor: '#d1fae5', paddingBottom: 5 },
  arabic: { fontSize: 26, textAlign: 'center', marginVertical: 15, color: '#065f46', lineHeight: 40 },
  meaning: { fontSize: 15, fontStyle: 'italic', color: '#4b5563', textAlign: 'center' }
});