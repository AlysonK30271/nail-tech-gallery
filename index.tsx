import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#ffffff', dark: '#000000' }}
    >
      {/* Top Hero */}
      <ThemedView style={styles.topHero}>
        <ThemedText style={styles.appName}>Nail Gallery</ThemedText>
        <ThemedText style={styles.tagline}>
          Upload • Organize • Share
        </ThemedText>
      </ThemedView>

      {/* Info Card */}
      <ThemedView style={styles.card}>
        <ThemedText style={styles.cardTitle}>
          Your Work, Curated
        </ThemedText>
        <ThemedText style={styles.bodyText}>
          Keep your nail sets organized by style, client, or collection.
        </ThemedText>
      </ThemedView>

      {/* Primary Action */}
      <Link href="/gallery" style={styles.primaryButton}>
        <ThemedText style={styles.primaryButtonText}>
          Open Gallery
        </ThemedText>
      </Link>

      {/* Footer */}
      <ThemedView style={styles.footer}>
        <ThemedText style={styles.footerText}>
          Private by default
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  topHero: {
    alignItems: 'center',
    paddingVertical: 56,
    marginBottom: 32,
  },

  appName: {
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  tagline: {
    marginTop: 6,
    fontSize: 14,
    letterSpacing: 1,
    textTransform: 'uppercase',
    opacity: 0.6,
  },

  card: {
    borderWidth: 1,
    borderColor: '#e5e5e5',
    borderRadius: 20,
    padding: 20,
    marginBottom: 32,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },

  bodyText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.7,
  },

  primaryButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 28,
  },

  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  footer: {
    alignItems: 'center',
    marginBottom: 16,
  },

  footerText: {
    fontSize: 12,
    letterSpacing: 1,
    opacity: 0.5,
    textTransform: 'uppercase',
  },
});
