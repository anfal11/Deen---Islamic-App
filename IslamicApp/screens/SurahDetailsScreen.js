import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av'; 

export default function SurahDetailsScreen({ route }) {
  const { surahNumber } = route.params;
  const [ayahs, setAyahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState(null);
  const [playingAyah, setPlayingAyah] = useState(null);

  useEffect(() => {
    fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.asad,bn.bengali,ar.alafasy`)
      .then(res => res.json())
      .then(data => {
        const arabicAyahs = data.data[0].ayahs;
        const englishAyahs = data.data[1].ayahs;
        const banglaAyahs = data.data[2].ayahs;
        const audioAyahs = data.data[3].ayahs; 
        
        const combined = arabicAyahs.map((ayah, index) => ({
          numberInSurah: ayah.numberInSurah,
          arabic: ayah.text,
          english: englishAyahs[index].text,
          bangla: banglaAyahs[index].text,
          audioUrl: audioAyahs[index].audio
        }));
        
        setAyahs(combined);
        setLoading(false);
      }).catch(err => console.error(err));
  }, [surahNumber]);

  const playAudio = async (url, ayahNumber) => {
    try {
      if (sound) {
        await sound.unloadAsync();
      }
      setPlayingAyah(ayahNumber); 
      const { sound: newSound } = await Audio.Sound.createAsync({ uri: url }, { shouldPlay: true });
      setSound(newSound);
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) setPlayingAyah(null);
      });
    } catch (error) {
      console.error("Audio play error:", error);
      setPlayingAyah(null);
    }
  };

  useEffect(() => {
    return sound ? () => { sound.unloadAsync(); } : undefined;
  }, [sound]);

  if (loading) return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#1E88E5" />
      <Text style={styles.loaderText}>Loading Ayahs...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={ayahs}
        keyExtractor={(item) => item.numberInSurah.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.headerRow}>
              <Text style={styles.numberBadge}>Ayah {item.numberInSurah}</Text>
              
              <TouchableOpacity 
                style={[styles.playButton, playingAyah === item.numberInSurah && styles.playingButton]} 
                onPress={() => playAudio(item.audioUrl, item.numberInSurah)}
              >
                <Text style={styles.playText}>
                  {playingAyah === item.numberInSurah ? "🔊 Playing..." : "▶ Play Audio"}
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.arabic}>{item.arabic}</Text>
            <Text style={styles.bangla}>{item.bangla}</Text>
            <Text style={styles.english}>{item.english}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F9FF' },
  loaderContainer: { flex: 1, backgroundColor: '#F5F9FF', justifyContent: 'center', alignItems: 'center' },
  loaderText: { marginTop: 15, color: '#1E88E5', fontWeight: 'bold' },
  card: { backgroundColor: 'white', padding: 20, margin: 10, borderRadius: 10, elevation: 3, borderWidth: 1, borderColor: '#E1F5FE' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  numberBadge: { backgroundColor: '#1E88E5', color: 'white', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, fontWeight: 'bold' },
  playButton: { backgroundColor: '#E1F5FE', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  playingButton: { backgroundColor: '#BBDEFB', borderWidth: 1, borderColor: '#1E88E5' },
  playText: { color: '#0D47A1', fontWeight: 'bold', fontSize: 13 },
  arabic: { fontSize: 26, textAlign: 'right', color: '#0D47A1', marginBottom: 15, lineHeight: 45 },
  bangla: { fontSize: 16, color: '#1565C0', marginBottom: 10, fontWeight: 'bold', lineHeight: 24 },
  english: { fontSize: 15, color: '#4b5563', fontStyle: 'italic', lineHeight: 22 }
});