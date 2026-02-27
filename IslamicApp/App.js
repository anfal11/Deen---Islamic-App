import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import QuranScreen from './screens/QuranScreen';
import SurahDetailsScreen from './screens/SurahDetailsScreen';
import HadithScreen from './screens/HadithScreen';
import HadithBookDetailsScreen from './screens/HadithBookDetailsScreen';
import DuaScreen from './screens/DuaScreen';
import SearchScreen from './screens/SearchScreen';
import TasbeehScreen from './screens/TasbeehScreen';
import PrayerTimesScreen from './screens/PrayerTimesScreen';
import QiblaScreen from './screens/QiblaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" backgroundColor="#1565C0" />
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#1E88E5' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' } }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Deen - Al Islam' }} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Search in Quran' }} />
        <Stack.Screen name="Quran" component={QuranScreen} options={{ title: 'Al Quran' }} />
        <Stack.Screen name="SurahDetails" component={SurahDetailsScreen} options={({ route }) => ({ title: route.params.surahName })} />
        <Stack.Screen name="Hadith" component={HadithScreen} options={{ title: 'Hadith Books' }} />
        <Stack.Screen name="HadithBookDetails" component={HadithBookDetailsScreen} options={({ route }) => ({ title: route.params.bookTitle })} />
        <Stack.Screen name="Dua" component={DuaScreen} options={{ title: 'Daily Duas' }} />
        <Stack.Screen name="Tasbeeh" component={TasbeehScreen} options={{ title: 'Tasbeeh Counter' }} />
        <Stack.Screen name="PrayerTimes" component={PrayerTimesScreen} options={{ title: 'Prayer Times' }} />
        <Stack.Screen name="Qibla" component={QiblaScreen} options={{ title: 'Qibla Compass' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}