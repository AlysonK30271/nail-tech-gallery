import {
  View, Text, FlatList, Image,
  TouchableOpacity, StyleSheet
} from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Saved() {
  const [images, setImages] = useState<string[]>([]);

  const load = async () => {
    const data = await AsyncStorage.getItem('savedImages');
    if (data) setImages(JSON.parse(data));
  };

  useEffect(() => {
    load();
  }, []);

  if (images.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>No saved designs yet 💅</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Saved Designs 💖</Text>

      <FlatList
        data={images}
        numColumns={2}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  title: { color: '#fff', textAlign: 'center', margin: 10 },
  image: { width: 180, height: 150, margin: 5 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  text: { color: '#bbb' },
});