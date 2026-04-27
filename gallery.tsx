import {
  View, Text, FlatList, Image, TouchableOpacity,
  StyleSheet, SafeAreaView, Modal
} from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Haptics from 'expo-haptics';

export default function Gallery() {
  const [images, setImages] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(false);

      const res = await fetch(
        'https://api.pexels.com/v1/search?query=nail%20art&per_page=20',
        { headers: { Authorization: 'v1zJU0P5peib3yyyI1zwBOExk1JhSh9BVhALhgfI8sngT5x4uX6pGGxOv1zJU0P5peib3yyyI1zwBOExk1JhSh9BVhALhgfI8sngT5x4uX6pGGxO' } }
      );

const data = await res.json();

if (!data.photos) {
  setError(true);
  return;
}
    } finally {
      setLoading(false);
    }
  };

  const loadSaved = async () => {
    const stored = await AsyncStorage.getItem('savedImages');
    if (stored) setSaved(JSON.parse(stored));
  };

  const saveImage = async (uri: string) => {
    if (saved.includes(uri)) return;

    const updated = [...saved, uri];
    setSaved(updated);
    await AsyncStorage.setItem('savedImages', JSON.stringify(updated));
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  useEffect(() => {
    fetchImages();
    loadSaved();
  }, []);

  if (loading) return <Text style={styles.center}>Loading...</Text>;

  if (error)
    return (
      <View style={styles.center}>
        <Text style={styles.info}>Error loading images</Text>
        <TouchableOpacity onPress={fetchImages}>
          <Text style={styles.retry}>Retry</Text>
        </TouchableOpacity>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Trending Nail Designs 💅</Text>

      <FlatList
        data={images}
        numColumns={2}
        keyExtractor={(item, i) => i.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => setSelectedImage(item)}>
            <Image source={{ uri: item }} style={styles.image} />
          </TouchableOpacity>
        )}
      />

      <Modal visible={!!selectedImage} transparent>
        <View style={styles.modal}>
          {selectedImage && (
            <>
              <Image source={{ uri: selectedImage }} style={styles.modalImg} />

              <TouchableOpacity style={styles.saveBtn} onPress={() => saveImage(selectedImage)}>
                <Text style={styles.saveText}>Save 💖</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setSelectedImage(null)}>
                <Text style={styles.close}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  title: { color: '#fff', textAlign: 'center', margin: 10 },
  image: { width: 180, height: 150, margin: 5, borderRadius: 10 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', color: '#fff' },
  info: { color: '#bbb' },
  retry: { color: '#f8c8dc', marginTop: 10 },
  modal: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  modalImg: { width: '90%', height: 300, marginBottom: 20 },
  saveBtn: { backgroundColor: '#f8c8dc', padding: 10, borderRadius: 10 },
  saveText: { color: '#000' },
  close: { color: '#fff', marginTop: 10 },
});