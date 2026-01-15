import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useCreateRestaurant } from '../../services/restaurant/mutation';

export default function AddRestaurantScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [longDescription, setLongDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [image, setImage] = useState(null);

  const createMutation = useCreateRestaurant();

  // Override onSuccess to navigate back
  const originalOnSuccess = createMutation.options?.onSuccess;
  // We can't easily override options of the hook result directly if we didn't pass options. 
  // Ideally, useCreateRestaurant should accept options or we handle navigation in the component side effect after mutation.
  // BUT, useMutation returns an object with `mutate` and `isPending` etc. `createMutation` IS that object.
  // The service definition has `onSuccess` built-in which invalidates queries. 
  // Creating a wrapper around the mutate function to adding callback is typical.
  // OR we can pass `onSuccess` to `mutate`. 
  // Let's check how the service was defined. It uses `useMutation({ mutationFn, onSuccess })`.
  // React Query allow passing `onSuccess` to `mutate(variable, { onSuccess })`.
  // So I can keep the service simple and add component specific logic here.
  
  // Actually, wait. The original code had:
  /*
    onSuccess: () => {
      queryClient.invalidateQueries(['restaurants']);
      Alert.alert('Succès', 'Restaurant ajouté avec succès', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    },
  */
  // The service only invalidates queries. It does NOT show alerts or navigate.
  // So I should modify how `createMutation.mutate` is called in `handleSubmit`.
  
  // So here simply replace the definition.


  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = () => {
    if (!name || !shortDescription || !longDescription || !address || !city || !latitude || !longitude) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (!image) {
      Alert.alert('Erreur', 'Veuillez sélectionner une image');
      return;
    }

    createMutation.mutate({
      name,
      shortDescription,
      longDescription,
      address,
      city,
      latitude,
      longitude,
      mainImage: image,
    }, {
      onSuccess: () => {
        Alert.alert('Succès', 'Restaurant ajouté avec succès', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      },
      onError: (error) => {
        Alert.alert('Erreur', error.response?.data?.error || 'Impossible d\'ajouter le restaurant');
      },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajouter un restaurant</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.section}>
          <Text style={styles.label}>Nom *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nom du restaurant"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description courte *</Text>
          <TextInput
            style={styles.input}
            value={shortDescription}
            onChangeText={setShortDescription}
            placeholder="Description brève"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Description longue *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={longDescription}
            onChangeText={setLongDescription}
            placeholder="Description détaillée"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Adresse *</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
            placeholder="Adresse complète"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Ville *</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="Ville"
          />
        </View>

        <View style={styles.row}>
          <View style={[styles.section, styles.halfWidth]}>
            <Text style={styles.label}>Latitude *</Text>
            <TextInput
              style={styles.input}
              value={latitude}
              onChangeText={setLatitude}
              placeholder="33.5731"
              keyboardType="decimal-pad"
            />
          </View>

          <View style={[styles.section, styles.halfWidth]}>
            <Text style={styles.label}>Longitude *</Text>
            <TextInput
              style={styles.input}
              value={longitude}
              onChangeText={setLongitude}
              placeholder="-7.6298"
              keyboardType="decimal-pad"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Image *</Text>
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Ionicons name="image-outline" size={40} color="#999" />
            <Text style={styles.imagePickerText}>
              {image ? 'Image sélectionnée ✓' : 'Sélectionner une image'}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, createMutation.isPending && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={createMutation.isPending}
          activeOpacity={0.8}
        >
          {createMutation.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Ajouter le restaurant</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollContent: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    height: 100,
    paddingTop: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  imagePicker: {
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
    borderRadius: 12,
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagePickerText: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
