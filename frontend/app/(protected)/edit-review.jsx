import { useState, useEffect } from 'react';
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
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useCanReview } from '../../services/review/queries';
import { useUpdateReview } from '../../services/review/mutation';

export default function EditReviewScreen() {
  const router = useRouter();
  const { reviewId, restaurantId, restaurantName } = useLocalSearchParams();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [visitDate, setVisitDate] = useState('');

  // Fetch existing review
  const { data: canReviewData, isLoading } = useCanReview(restaurantId);

  useEffect(() => {
    if (canReviewData?.existingReview) {
      const review = canReviewData.existingReview;
      setRating(review.rating);
      setComment(review.comment);
      setVisitDate(review.visitDate);
    }
  }, [canReviewData]);

  const updateMutation = useUpdateReview(reviewId, restaurantId);

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Erreur', 'Veuillez sélectionner une note');
      return;
    }
    if (!comment.trim()) {
      Alert.alert('Erreur', 'Veuillez ajouter un commentaire');
      return;
    }

    updateMutation.mutate({
      rating,
      comment: comment.trim(),
      visitDate,
      restaurantId: parseInt(restaurantId),
    }, {
      onSuccess: () => {
        Alert.alert('Succès', 'Avis modifié avec succès', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      },
      onError: (error) => {
        Alert.alert('Erreur', error.response?.data?.error || 'Impossible de modifier l\'avis');
      },
    });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

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
        <Text style={styles.headerTitle}>Modifier l'avis</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.restaurantName}>{restaurantName}</Text>

        {/* Rating */}
        <View style={styles.section}>
          <Text style={styles.label}>Note *</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                style={styles.starButton}
              >
                <Ionicons
                  name={star <= rating ? 'star' : 'star-outline'}
                  size={40}
                  color="#FFD700"
                />
              </TouchableOpacity>
            ))}
          </View>
          {rating > 0 && (
            <Text style={styles.ratingText}>
              {rating === 1 && 'Très mauvais'}
              {rating === 2 && 'Mauvais'}
              {rating === 3 && 'Moyen'}
              {rating === 4 && 'Bon'}
              {rating === 5 && 'Excellent'}
            </Text>
          )}
        </View>

        {/* Visit Date */}
        <View style={styles.section}>
          <Text style={styles.label}>Date de visite *</Text>
          <TextInput
            style={styles.input}
            value={visitDate}
            onChangeText={setVisitDate}
            placeholder="YYYY-MM-DD"
          />
        </View>

        {/* Comment */}
        <View style={styles.section}>
          <Text style={styles.label}>Votre avis *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={comment}
            onChangeText={setComment}
            placeholder="Partagez votre expérience..."
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />
          <Text style={styles.charCount}>{comment.length} caractères</Text>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, updateMutation.isPending && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={updateMutation.isPending}
          activeOpacity={0.8}
        >
          {updateMutation.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Enregistrer les modifications</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  restaurantName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FF6B6B',
    marginBottom: 30,
    textAlign: 'center',
  },
  section: {
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  starButton: {
    padding: 4,
  },
  ratingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
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
    height: 150,
    paddingTop: 14,
  },
  charCount: {
    marginTop: 8,
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
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
