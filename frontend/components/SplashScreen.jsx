import { View, Text, StyleSheet, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>🍽️</Text>
        </View>
        <Text style={styles.appName}>Achban-Lik</Text>
        <Text style={styles.tagline}>Discover the best restaurants</Text>
      </View>
      {/* <Text style={styles.footer}>Training Project</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FB8500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 60,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  footer: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 40,
  },
});
