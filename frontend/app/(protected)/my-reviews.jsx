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
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { useMyReviews } from "../../services/review/queries";
import { useDeleteReview } from "../../services/review/mutation";

export default function MyReviewsScreen() {
  const router = useRouter();

  const {
    data: reviewsData,
    isLoading,
    refetch,
    isRefreshing,
  } = useMyReviews();

  const deleteMutation = useDeleteReview();

  const handleDeleteReview = (reviewId) => {
    Alert.alert(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer cet avis?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => deleteMutation.mutate(reviewId),
        },
      ]
    );
  };

  const handleEditReview = (review) => {
    router.push(
      `/edit-review?reviewId=${review.id}&restaurantId=${review.restaurantId}&restaurantName=${review.restaurant.name}`
    );
  };

  const renderStars = (rating) => {
    return (
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? "star" : "star-outline"}
            size={14}
            color="#FFD700"
          />
        ))}
      </View>
    );
  };

  const renderReviewCard = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          router.push(`/restaurant-details?id=${item.restaurantId}`)
        }
        activeOpacity={0.7}
      >
        <View style={styles.cardHeader}>
          <Image
            source={{
              uri: `http://localhost:3000${item.restaurant.mainImage}`,
            }}
            style={styles.restaurantImage}
          />
          <View style={styles.restaurantInfo}>
            <Text style={styles.restaurantName} numberOfLines={1}>
              {item.restaurant.name}
            </Text>
            <Text style={styles.restaurantCity}>{item.restaurant.city}</Text>
            {renderStars(item.rating)}
          </View>
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.visitDate}>
            <Ionicons name="calendar-outline" size={14} color="#666" />{" "}
            {new Date(item.visitDate).toLocaleDateString("fr-FR")}
          </Text>
          <Text style={styles.comment} numberOfLines={3}>
            {item.comment}
          </Text>
        </View>

        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleEditReview(item)}
          >
            <Ionicons name="create-outline" size={20} color="#25c71fff" />
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleDeleteReview(item.id)}
          >
            <Ionicons name="trash-outline" size={20} color="#ff4444" />
            <Text style={[styles.actionButtonText, { color: "#ff4444" }]}>
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Mes Avis</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FB8500" />
        </View>
      ) : (
        <FlatList
          data={reviewsData?.reviews || []}
          renderItem={renderReviewCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refetch}
              colors={["#FB8500"]}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="chatbox-ellipses-outline"
                size={80}
                color="#ccc"
              />
              <Text style={styles.emptyText}>Aucun avis publié</Text>
              <Text style={styles.emptySubtext}>
                Commencez à partager vos expériences!
              </Text>
              <TouchableOpacity
                style={styles.browseButton}
                onPress={() => router.push("/restaurants")}
              >
                <Text style={styles.browseButtonText}>
                  Découvrir les restaurants
                </Text>
              </TouchableOpacity>
            </View>
          }
        />
      )}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.bottomButton}
          onPress={() => router.push("/")}
        >
          <Ionicons name="restaurant-outline" size={22} color="#fff" />
          <Text style={styles.bottomButtonText}>Back to restaurants</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#FB8500",
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },
  cardHeader: {
    flexDirection: "row",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  restaurantImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  restaurantInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  restaurantCity: {
    fontSize: 12,
    color: "#888",
    marginBottom: 6,
  },
  stars: {
    flexDirection: "row",
    gap: 2,
  },
  cardContent: {
    padding: 16,
  },
  visitDate: {
    fontSize: 12,
    color: "#666",
    marginBottom: 8,
  },
  comment: {
    fontSize: 14,
    color: "#444",
    lineHeight: 20,
  },
  cardActions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionButtonText: {
    fontSize: 14,
    color: "#25c71fff",
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#888",
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#aaa",
    marginTop: 8,
  },
  browseButton: {
    backgroundColor: "#FB8500",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 24,
  },
  browseButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
  },

  bottomButton: {
    backgroundColor: "#FB8500",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  bottomButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
