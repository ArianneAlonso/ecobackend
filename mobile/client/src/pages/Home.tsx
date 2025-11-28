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
    title: 'Solicitar Retiro',
    description: 'Programa la recolección de tus residuos',
    route: 'Pickup',
  },
  {
    icon: QrCode,
    title: 'Escanear QR',
    description: 'Valida tu entrega y suma puntos',
  },
  {
    icon: MapPin,
    title: 'Contenedores',
    description: 'Encuentra el más cercano',
    route: 'Map',
  },
  {
    icon: Leaf,
    title: 'Consejos',
    description: 'Aprende a reciclar mejor',
    route: 'Tips',
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Acciones rápidas</Text>
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
                    <action.icon size={28} color="#43a047" />
                  </View>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionDescription} numberOfLines={2}>
                    {action.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Próxima recolección</Text>
            <View style={styles.collectionCard}>
              <View style={styles.collectionHeader}>
                <View style={styles.collectionInfo}>
                  <View style={styles.collectionRow}>
                    <Calendar size={18} color="#2e7d32" />
                    <Text style={styles.collectionDate}>
                      Viernes, 1 de Noviembre
                    </Text>
                  </View>
                  <View style={styles.collectionRow}>
                    <Clock size={18} color="#558b2f" />
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
                  {['Plástico', 'Vidrio', 'Papel'].map((material, index) => (
                    <View key={index} style={styles.materialChip}>
                      <Text style={styles.materialText}>{material}</Text>
                    </View>
                  ))}
                </View>
              </View>

              <TouchableOpacity style={styles.reminderButton}>
                <Text style={styles.reminderButtonText}>
                  Configurar recordatorio
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
    backgroundColor: '#f4f9f1',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 28,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
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
    color: '#2e7d32',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  actionsContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  actionCard: {
    width: 150,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0f2f1',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e6f4d7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1b5e20',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 12,
    color: '#546e7a',
    lineHeight: 16,
  },
  collectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0f2f1',
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
    color: '#2e7d32',
  },
  collectionTime: {
    fontSize: 14,
    color: '#455a64',
  },
  daysUntilBadge: {
    backgroundColor: '#9ccc65',
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
    minWidth: 60,
  },
  daysUntilNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  daysUntilText: {
    fontSize: 12,
    color: '#ffffff',
    marginTop: -2,
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
    color: '#2e7d32',
    marginBottom: 8,
  },
  materialsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  materialChip: {
    backgroundColor: '#e6f4d7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#9ccc65',
  },
  materialText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#33691e',
  },
  reminderButton: {
    backgroundColor: '#9ccc65',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  reminderButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});
