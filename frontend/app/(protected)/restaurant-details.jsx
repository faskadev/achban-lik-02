import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { useRestaurant } from '../../services/restaurant/queries';
import { useCanReview } from '../../services/review/queries';
import { useDeleteReview } from '../../services/review/mutation';

export default function RestaurantDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { user } = useAuthStore();

  const { data: restaurantData, isLoading } = useRestaurant(id);

  const { data: canReviewData } = useCanReview(id);

  const deleteMutation = useDeleteReview(id);

  const handleDeleteReview = (reviewId) => {
    Alert.alert(
      'Confirmer la suppression',
      'Êtes-vous sûr de vouloir supprimer cet avis?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: () => deleteMutation.mutate(reviewId) },
      ]
    );
  };

  const handleAddReview = () => {
    router.push(`/add-review?restaurantId=${id}&restaurantName=${restaurantData?.name}`);
  };

  const handleEditReview = (review) => {
    router.push(`/edit-review?reviewId=${review.id}&restaurantId=${id}&restaurantName=${restaurantData?.name}`);
  };

  const renderStars = (rating) => {
    return (
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={16}
            color="#FFD700"
          />
        ))}
      </View>
    );
  };

  const renderReviewItem = (review) => {
    const isOwnReview = review.userId === user?.id;
    const userReview = canReviewData?.existingReview;
    const isUserReview = userReview && review.id === userReview.id;

    return (
      <View key={review.id} style={styles.reviewItem}>
        <View style={styles.reviewHeader}>
          <View style={styles.reviewUser}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {review.user.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View>
              <Text style={styles.reviewUserName}>{review.user.name}</Text>
              <Text style={styles.reviewDate}>
                {new Date(review.visitDate).toLocaleDateString('fr-FR')}
              </Text>
            </View>
          </View>
          {renderStars(review.rating)}
        </View>
        <Text style={styles.reviewComment}>{review.comment}</Text>
        
        {isOwnReview && (
          <View style={styles.reviewActions}>
            <TouchableOpacity
              style={styles.reviewActionButton}
              onPress={() => handleEditReview(review)}
            >
              <Ionicons name="create-outline" size={18} color="#FF6B6B" />
              <Text style={styles.reviewActionText}>Modifier</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.reviewActionButton}
              onPress={() => handleDeleteReview(review.id)}
            >
              <Ionicons name="trash-outline" size={18} color="#ff4444" />
              <Text style={[styles.reviewActionText, { color: '#ff4444' }]}>Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B6B" />
      </View>
    );
  }

  if (!restaurantData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Restaurant non trouvé</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const averageRating = restaurantData.averageRating || 0;
  const reviewCount = restaurantData.reviewCount || 0;

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header with Image */}
      <View style={styles.headerImageContainer}>
        <Image
          source={{ uri: `http://localhost:3000${restaurantData.mainImage}` }}
          style={styles.headerImage}
        />
        <TouchableOpacity
          style={styles.backIconButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Restaurant Info */}
        <View style={styles.infoSection}>
          <Text style={styles.restaurantName}>{restaurantData.name}</Text>
          
          <View style={styles.ratingRow}>
            <View style={styles.ratingContainer}>
              {renderStars(Math.round(averageRating))}
              <Text style={styles.ratingValue}>
                {averageRating > 0 ? averageRating.toFixed(1) : 'N/A'}
              </Text>
            </View>
            <Text style={styles.reviewCount}>
              ({reviewCount} {reviewCount === 1 ? 'avis' : 'avis'})
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <Text style={styles.detailText}>{restaurantData.address}, {restaurantData.city}</Text>
          </View>

          <Text style={styles.description}>{restaurantData.longDescription}</Text>
        </View>

        {/* Add Review Button */}
        {canReviewData?.canReview && (
          <TouchableOpacity style={styles.addReviewButton} onPress={handleAddReview}>
            <Ionicons name="add-circle-outline" size={24} color="#fff" />
            <Text style={styles.addReviewButtonText}>Ajouter un avis</Text>
          </TouchableOpacity>
        )}

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>
            Avis ({restaurantData.reviews?.length || 0})
          </Text>
          
          {restaurantData.reviews && restaurantData.reviews.length > 0 ? (
            restaurantData.reviews.map(renderReviewItem)
          ) : (
            <View style={styles.noReviews}>
              <Ionicons name="chatbox-ellipses-outline" size={48} color="#ccc" />
              <Text style={styles.noReviewsText}>Aucun avis pour le moment</Text>
              <Text style={styles.noReviewsSubtext}>Soyez le premier à donner votre avis!</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  headerImageContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
  },
  backIconButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  content: {
    flex: 1,
  },
  infoSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  restaurantName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stars: {
    flexDirection: 'row',
    gap: 2,
  },
  ratingValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  reviewCount: {
    fontSize: 14,
    color: '#888',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 16,
  },
  detailText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  description: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
  },
  addReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6B6B',
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 14,
    borderRadius: 12,
    gap: 8,
  },
  addReviewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  reviewsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  reviewItem: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  reviewUserName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
  },
  reviewComment: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  reviewActions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  reviewActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reviewActionText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '500',
  },
  noReviews: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noReviewsText: {
    fontSize: 16,
    color: '#888',
    marginTop: 12,
  },
  noReviewsSubtext: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
  },
  backButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
