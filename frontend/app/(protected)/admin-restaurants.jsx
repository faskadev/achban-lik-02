import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRestaurants } from '../../services/restaurant/queries';
import { useDeleteRestaurant } from '../../services/restaurant/mutation';

export default function AdminRestaurantsScreen() {
  const router = useRouter();

  const { data: restaurantsData, isLoading, refetch, isRefreshing } = useRestaurants();

  const deleteMutation = useDeleteRestaurant();

  const handleDeleteRestaurant = (id, name) => {
    Alert.alert(
      'Confirmer la suppression',
      `Êtes-vous sûr de vouloir supprimer "${name}"? Cette action supprimera également tous les avis associés.`,
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'Supprimer', style: 'destructive', onPress: () => deleteMutation.mutate(id, {
          onSuccess: () => {
            Alert.alert('Succès', 'Restaurant supprimé avec succès');
          },
          onError: (error) => {
            Alert.alert('Erreur', error.response?.data?.error || 'Impossible de supprimer le restaurant');
          },
        }) },
      ]
    );
  };

  const renderRestaurantCard = ({ item }) => {
    return (
      <View style={styles.card}>
        <TouchableOpacity
          onPress={() => router.push(`/restaurant-details?id=${item.id}`)}
          activeOpacity={0.7}
        >
          <Image
            source={{ uri: `http://localhost:3000${item.mainImage}` }}
            style={styles.image}
          />
          <View style={styles.cardContent}>
            <Text style={styles.restaurantName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.city}>{item.city}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {item.shortDescription}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push(`/edit-restaurant?id=${item.id}`)}
          >
            <Ionicons name="create-outline" size={20} color="#FF6B6B" />
            <Text style={styles.actionButtonText}>Modifier</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDeleteRestaurant(item.id, item.name)}
          >
            <Ionicons name="trash-outline" size={20} color="#ff4444" />
            <Text style={[styles.actionButtonText, { color: '#ff4444' }]}>Supprimer</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Gestion Restaurants</Text>
        <TouchableOpacity
          onPress={() => router.push('/add-restaurant')}
          style={styles.addButton}
        >
          <Ionicons name="add-circle" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B6B" />
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
              colors={['#FF6B6B']}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="restaurant-outline" size={80} color="#ccc" />
              <Text style={styles.emptyText}>Aucun restaurant</Text>
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
    backgroundColor: '#FF6B6B',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    padding: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#f0f0f0',
  },
  cardContent: {
    padding: 16,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  city: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#888',
    lineHeight: 20,
  },
  cardActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 20,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#FF6B6B',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#888',
    marginTop: 16,
  },
});
