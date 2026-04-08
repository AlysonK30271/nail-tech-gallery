import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'NAIL_IMAGES';

export default function App() {
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [explore, setExplore] = useState([]);

  useEffect(() => {
    loadImages();
    fetchExplore();
  }, []);

  // Load saved gallery images
  const loadImages = async () => {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (stored) setImages(JSON.parse(stored));
  };

  // Save gallery images
  const saveImages = async (updated) => {
    setImages(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  // Pick an image from device
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const newImage = {
        id: Date.now(),
        uri: result.assets[0].uri,
      };
      saveImages([newImage, ...images]);
    }
  };

const fetchExplore = async () => {
  try {
    const res = await fetch(
      'https://api.pexels.com/v1/search?query=nail%20art&per_page=10',
      {
        headers: {
          Authorization: 'l8N62QoSebrB2x7o0DktyoUahguAFgOhXTXHSTaY5ZiXMEvr00WEiQxa',
        },
      }
    );
    const data = await res.json();
    const urls = data.photos.map((photo) => photo.src.medium);
    setExplore(urls);
  } catch (err) {
    console.log(err);
  }
};

  // Render gallery item
  const renderGalleryItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelected({ uri: item.uri })} style={styles.card}>
      <Image source={{ uri: item.uri }} style={styles.image} />
    </TouchableOpacity>
  );

  // Render explore item
  const renderExploreItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelected({ uri: item })}>
      <Image source={{ uri: item }} style={styles.exploreImage} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>NAIL ARCHIVE</Text>

      {/* Explore Section */}
      <Text style={styles.section}>EXPLORE</Text>
      <FlatList
        data={explore}
        horizontal
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderExploreItem}
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 10 }}
      />

      {/* Gallery */}
      <FlatList
        data={images}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderGalleryItem}
        contentContainerStyle={{ padding: 6 }}
      />

      {/* Add Button */}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>ADD</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={!!selected} transparent>
        {selected && (
          <View style={styles.modal}>
            <Image
              source={{ uri: selected.uri }}
              style={styles.fullImage}
              resizeMode="contain"
            />

            <View style={styles.modalButtons}>
              {/* Close */}
              <TouchableOpacity
                onPress={() => setSelected(null)}
                style={styles.closeBtn}
              >
                <Text style={styles.closeText}>CLOSE</Text>
              </TouchableOpacity>

              {/* Save */}
              <TouchableOpacity
                onPress={() => {
                  // Save image if not already in gallery
                  const exists = images.find(img => img.uri === selected.uri);
                  if (!exists) {
                    const newImage = { id: Date.now(), uri: selected.uri };
                    saveImages([newImage, ...images]);
                  }
                  setSelected(null);
                }}
                style={styles.saveBtn}
              >
                <Text style={styles.saveText}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  title: { color: '#fff', fontSize: 26, textAlign: 'center', marginVertical: 10, letterSpacing: 3 },
  section: { color: '#fff', fontSize: 14, marginLeft: 10, marginBottom: 6, letterSpacing: 2 },
  exploreImage: { width: 160, height: 160, borderRadius: 14, marginHorizontal: 8 },
  card: { width: '50%', padding: 6 },
  image: { width: '100%', height: 180, borderRadius: 14 },
  button: { position: 'absolute', bottom: 30, alignSelf: 'center', backgroundColor: '#fff', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 30 },
  buttonText: { color: '#000', fontWeight: 'bold', letterSpacing: 2 },
  modal: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  fullImage: { width: '100%', height: '75%' },
  modalButtons: { position: 'absolute', top: 60, right: 20, flexDirection: 'row', gap: 10 },
  closeBtn: { backgroundColor: '#fff', padding: 10, borderRadius: 20 },
  closeText: { color: '#000', fontWeight: 'bold' },
  saveBtn: { backgroundColor: '#fff', padding: 10, borderRadius: 20 },
  saveText: { color: '#000', fontWeight: 'bold' },
});