import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';
import { useRestaurants, useCities } from '../../services/restaurant/queries';
import { BASE_URL } from '../../services/api';

export default function RestaurantsScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [selectedCity, setSelectedCity] = useState(null);

  const { data: restaurantsData, isLoading, refetch, isRefreshing } = useRestaurants(
    selectedCity ? { city: selectedCity } : {}
  );

  const { data: citiesData } = useCities();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const renderRestaurantCard = ({ item }) => {
    const averageRating = Number(item.averageRating) || 0;
    const reviewCount = Number(item.reviewCount) || 0;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push(`/restaurant-details?id=${item.id}`)}
        activeOpacity={0.7}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `${BASE_URL}${item.mainImage}` }}
            style={styles.image}
            defaultSource={require('../../assets/placeholder.png')}
          />
          <View style={styles.cityBadge}>
            <Text style={styles.cityBadgeText}>{item.city}</Text>
          </View>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.restaurantName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {item.shortDescription}
          </Text>
          <View style={styles.cardFooter}>
            <View style={styles.rating}>
              <Ionicons name="star" size={16} color="#FFD700" />
              <Text style={styles.ratingText}>
                {averageRating > 0 ? averageRating.toFixed(1) : 'N/A'}
              </Text>
            </View>
            <Text style={styles.reviewCount}>
              {reviewCount} {reviewCount === 1 ? 'avis' : 'avis'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello,</Text>
          <Text style={styles.userName}>{user?.name || 'Utilisateur'}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* City Filters */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[{ city: null, label: 'Tous' }, ...(citiesData?.cities || []).map(c => ({ city: c, label: c }))]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedCity === item.city && styles.filterChipActive,
              ]}
              onPress={() => setSelectedCity(item.city)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedCity === item.city && styles.filterChipTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.filterList}
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push('/my-reviews')}
        >
          <Ionicons name="chatbox-ellipses-outline" size={20} color="#FB8500" />
          <Text style={styles.actionButtonText}>My Reviews</Text>
        </TouchableOpacity>

        {user?.role === 'admin' && (
          <TouchableOpacity
            style={[styles.actionButton, styles.adminButton]}
            onPress={() => router.push('/admin-restaurants')}
          >
            <Ionicons name="settings-outline" size={20} color="#fff" />
            <Text style={styles.adminButtonText}>Admin Management</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Restaurant List */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FB8500" />
        </View>
      ) : (
        <FlatList
          data={restaurantsData?.restaurants || []}
          renderItem={renderRestaurantCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refetch}
              colors={['#FB8500']}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No restaurant found</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#FB8500',
    paddingTop: 50,
    paddingBottom: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    padding: 8,
  },
  filterContainer: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterList: {
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  filterChipActive: {
    backgroundColor: '#FB8500',
  },
  filterChipText: {
    fontSize: 14,
    color: '#FB8500',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
    gap: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#FB8500',
    gap: 8,
  },
  actionButtonText: {
    color: '#FB8500',
    fontWeight: '600',
    fontSize: 14,
  },
  adminButton: {
    backgroundColor: '#FB8500',
    borderColor: '#FB8500',
  },
  adminButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  listContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  cityBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FB8500',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  cityBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  cardContent: {
    padding: 16,
  },
  restaurantName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000ff',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reviewCount: {
    fontSize: 14,
    color: '#888',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
});
