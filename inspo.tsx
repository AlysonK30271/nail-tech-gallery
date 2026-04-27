import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';

export default function Inspo() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Nail Inspiration 📸</Text>

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.text}>Pick Image</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  title: { color: '#fff', marginBottom: 20 },
  button: { backgroundColor: '#f8c8dc', padding: 12, borderRadius: 10 },
  text: { textAlign: 'center', color: '#000' },
  image: { width: '100%', height: 300, marginTop: 20 },
});