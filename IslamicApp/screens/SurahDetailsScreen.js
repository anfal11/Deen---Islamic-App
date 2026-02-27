import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av'; // Audio play korar package

export default function SurahDetailsScreen({ route }) {
  const { surahNumber } = route.params;
  const [ayahs, setAyahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState(null);
  const [playingAyah, setPlayingAyah] = useState(null); // Kon ayah ta play hocche tar track rakhbe

  useEffect(() => {
    // Ekhane 'ar.alafasy' add kora hoyeche audio er jonno
    fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.asad,bn.bengali,ar.alafasy`)
      .then(res => res.json())
      .then(data => {
        const arabicAyahs = data.data[0].ayahs;
        const englishAyahs = data.data[1].ayahs;
        const banglaAyahs = data.data[2].ayahs;
        const audioAyahs = data.data[3].ayahs; // 4 number data ta hocche audio
        
        const combined = arabicAyahs.map((ayah, index) => ({
          numberInSurah: ayah.numberInSurah,
          arabic: ayah.text,
          english: englishAyahs[index].text,
          bangla: banglaAyahs[index].text,
          audioUrl: audioAyahs[index].audio // Audio URL ta ekhane save korchi
        }));
        
        setAyahs(combined);
        setLoading(false);
      }).catch(err => console.error(err));
  }, [surahNumber]);

  // Audio Play korar function
  const playAudio = async (url, ayahNumber) => {
    try {
      // Age kono audio play running thakle ta stop kore dibe
      if (sound) {
        await sound.unloadAsync();
      }
      
      setPlayingAyah(ayahNumber); // UI te dekhabe je ei ayah ta play hocche
      
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );
      setSound(newSound);

      // Audio shesh hoye gele play icon abar normal hoye jabe
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setPlayingAyah(null);
        }
      });
    } catch (error) {
      console.error("Audio play error:", error);
      setPlayingAyah(null);
    }
  };

  // Screen theke ber hoye gele audio stop korar jonno
  useEffect(() => {
    return sound ? () => { sound.unloadAsync(); } : undefined;
  }, [sound]);

  if (loading) return <ActivityIndicator size="large" color="#10b981" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={ayahs}
        keyExtractor={(item) => item.numberInSurah.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.headerRow}>
              <Text style={styles.numberBadge}>Ayah {item.numberInSurah}</Text>
              
              {/* Play Button */}
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
  container: { flex: 1, backgroundColor: '#f0fdf4' },
  card: { backgroundColor: 'white', padding: 20, margin: 10, borderRadius: 10, elevation: 2 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  numberBadge: { backgroundColor: '#10b981', color: 'white', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15, fontWeight: 'bold' },
  playButton: { backgroundColor: '#e2e8f0', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  playingButton: { backgroundColor: '#d1fae5', borderWidth: 1, borderColor: '#10b981' },
  playText: { color: '#065f46', fontWeight: 'bold', fontSize: 13 },
  arabic: { fontSize: 26, textAlign: 'right', color: '#065f46', marginBottom: 15, lineHeight: 45 },
  bangla: { fontSize: 16, color: '#1f2937', marginBottom: 10, fontWeight: 'bold', lineHeight: 24 },
  english: { fontSize: 15, color: '#4b5563', fontStyle: 'italic', lineHeight: 22 }
});