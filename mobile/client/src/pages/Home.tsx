import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Truck, QrCode, MapPin, Leaf, Calendar, Clock } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

interface QuickAction {
  icon: any;
  title: string;
  description: string;
  route?: string;
}

const quickActions: QuickAction[] = [
  {
    icon: Truck,
    title: "Solicitar Retiro",
    description: "Programa la recolección de tus residuos",
    route: "Pickup",
  },
  {
    icon: QrCode,
    title: "Escanear QR",
    description: "Valida tu entrega y suma puntos",
  },
  {
    icon: MapPin,
    title: "Contenedores",
    description: "Encuentra el más cercano",
    route: "Map",
  },
  {
    icon: Leaf,
    title: "Consejos",
    description: "Aprende a reciclar mejor",
    route: "Tips",
  },
];

export default function Homepage() {
  const navigation = useNavigation<any>();

  const handleActionPress = (action: QuickAction) => {
    if (action.route) {
      navigation.navigate(action.route);
    } else {
      console.log(`Acción: ${action.title}`);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header con gradiente */}
        <LinearGradient
          colors={['#9ccc65', '#8bc34a']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>¡Hola, Usuario!</Text>
          <Text style={styles.headerSubtitle}>
            Juntos hacemos un planeta más verde
          </Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* Acciones Rápidas */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.actionsContainer}
            >
              {quickActions.map((action, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.actionCard}
                  activeOpacity={0.7}
                  onPress={() => handleActionPress(action)}
                >
                  <View style={styles.iconContainer}>
                    <action.icon size={28} color="#9ccc65" />
                  </View>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionDescription} numberOfLines={2}>
                    {action.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Próxima Recolección */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Próxima Recolección</Text>
            <View style={styles.collectionCard}>
              <View style={styles.collectionHeader}>
                <View style={styles.collectionInfo}>
                  <View style={styles.collectionRow}>
                    <Calendar size={18} color="#9ccc65" />
                    <Text style={styles.collectionDate}>
                      Viernes, 1 de Noviembre
                    </Text>
                  </View>
                  <View style={styles.collectionRow}>
                    <Clock size={18} color="#666" />
                    <Text style={styles.collectionTime}>
                      8:00 AM - 12:00 PM
                    </Text>
                  </View>
                </View>
                <View style={styles.daysUntilBadge}>
                  <Text style={styles.daysUntilNumber}>1</Text>
                  <Text style={styles.daysUntilText}>día</Text>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.materialsSection}>
                <Text style={styles.materialsLabel}>Materiales:</Text>
                <View style={styles.materialsContainer}>
                  {["Plástico", "Vidrio", "Papel"].map((material, index) => (
                    <View key={index} style={styles.materialChip}>
                      <Text style={styles.materialText}>{material}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <TouchableOpacity style={styles.reminderButton}>
                <Text style={styles.reminderButtonText}>
                  Configurar Recordatorio
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 32,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    paddingTop: 24,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  actionsContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  actionCard: {
    width: 140,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f8e9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  collectionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  collectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  collectionInfo: {
    flex: 1,
    gap: 8,
  },
  collectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  collectionDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  collectionTime: {
    fontSize: 14,
    color: '#666',
  },
  daysUntilBadge: {
    backgroundColor: '#9ccc65',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    minWidth: 60,
  },
  daysUntilNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  daysUntilText: {
    fontSize: 12,
    color: '#fff',
    marginTop: -4,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  materialsSection: {
    marginBottom: 16,
  },
  materialsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  materialsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  materialChip: {
    backgroundColor: '#f1f8e9',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#9ccc65',
  },
  materialText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#689f38',
  },
  reminderButton: {
    backgroundColor: '#9ccc65',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  reminderButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});