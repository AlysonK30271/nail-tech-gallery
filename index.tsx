import { View, Text, StyleSheet, Platform } from 'react-native';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

export default function Home() {
  useEffect(() => {
    const setupNotifications = async () => {
      await Notifications.requestPermissionsAsync();

      // Android requires a notification channel
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }

      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'We miss you 💅',
            body: 'Come back and upload your next nail inspo!',
          },
          trigger: {
            type: 'timeInterval',
            seconds: 60 * 60 * 24 * 2, // 2 days
            repeats: false,
          },
        });
      } catch (e) {
        console.log('Notification error:', e);
      }
    };

    setupNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nail Inspo Gallery 💅</Text>

      <Text style={styles.subtitle}>
        Find. Save. Inspire.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Browse Gallery</Text>
        <Text style={styles.cardText}>
          Discover trending nail designs from around the world
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Upload Inspiration</Text>
        <Text style={styles.cardText}>
          Save your own nail ideas and styles
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>My Saved Designs</Text>
        <Text style={styles.cardText}>
          Keep all your favorite looks in one place
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'center',
  },

  title: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
  },

  subtitle: {
    color: '#f8c8dc',
    textAlign: 'center',
    marginBottom: 30,
    fontSize: 16,
  },

  card: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  cardTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },

  cardText: {
    color: '#bbb',
    fontSize: 14,
  },
});