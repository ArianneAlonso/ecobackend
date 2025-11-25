import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Award, TrendingUp, History, ChevronRight } from 'lucide-react-native';

interface Reward {
  id: string;
  title: string;
  description: string;
  pointsRequired: number;
  merchant: string;
}

interface HistoryItem {
  date: string;
  action: string;
  points: string;
}

const rewards: Reward[] = [
  {
    id: "1",
    title: "20% de descuento",
    description: "En tu próxima compra en productos ecológicos",
    pointsRequired: 500,
    merchant: "EcoTienda Verde",
  },
  {
    id: "2",
    title: "Café gratis",
    description: "Una bebida de tu elección",
    pointsRequired: 300,
    merchant: "Café Sustentable",
  },
  {
    id: "3",
    title: "Bolsa reutilizable",
    description: "Bolsa ecológica premium de tela orgánica",
    pointsRequired: 800,
    merchant: "EcoResiduos Store",
  },
];

const history: HistoryItem[] = [
  { date: "28 Oct", action: "Retiro completado", points: "+50" },
  { date: "25 Oct", action: "Evento asistido", points: "+100" },
  { date: "22 Oct", action: "Retiro completado", points: "+50" },
  { date: "20 Oct", action: "Bono semanal", points: "+25" },
];

export default function Points() {
  const currentPoints = 1250;
  const pointsChange = 85;
  const currentLevel = "Eco Warrior";
  const pointsToNextLevel = 750;
  const levelProgress = 62; // porcentaje

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Puntos</Text>
        <TouchableOpacity>
          <Text style={styles.headerAction}>Historial</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Points Card */}
        <View style={styles.pointsCard}>
          <View style={styles.pointsHeader}>
            <Text style={styles.pointsLabel}>Puntos Disponibles</Text>
            <View style={styles.changeContainer}>
              <Text style={styles.changeText}>+{pointsChange}</Text>
              <Text style={styles.changeLabel}>esta semana</Text>
            </View>
          </View>
          <Text style={styles.pointsValue}>{currentPoints.toLocaleString()}</Text>
          <Text style={styles.pointsSubtext}>pts</Text>
        </View>

        {/* Level Card */}
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <View style={styles.levelIconContainer}>
              <TrendingUp size={20} color="#9ccc65" />
            </View>
            <View style={styles.levelInfo}>
              <Text style={styles.levelTitle}>Nivel: {currentLevel}</Text>
              <Text style={styles.levelSubtext}>
                {pointsToNextLevel} puntos para el siguiente nivel
              </Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${levelProgress}%` }]} />
          </View>
        </View>

        {/* Rewards Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recompensas Destacadas</Text>
            <View style={styles.badge}>
              <Award size={14} color="#666" />
              <Text style={styles.badgeText}>{rewards.length}</Text>
            </View>
          </View>

          {rewards.slice(0, 2).map((reward) => (
            <TouchableOpacity
              key={reward.id}
              style={styles.rewardCard}
              activeOpacity={0.7}
            >
              <View style={styles.rewardContent}>
                <Text style={styles.rewardTitle}>{reward.title}</Text>
                <Text style={styles.rewardDescription} numberOfLines={2}>
                  {reward.description}
                </Text>
                <Text style={styles.rewardMerchant}>{reward.merchant}</Text>
              </View>
              <View style={styles.rewardRight}>
                <View style={styles.pointsRequiredBadge}>
                  <Text style={styles.pointsRequiredText}>
                    {reward.pointsRequired}
                  </Text>
                  <Text style={styles.pointsRequiredLabel}>pts</Text>
                </View>
                <ChevronRight size={20} color="#999" />
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>
              Ver Todas las Recompensas
            </Text>
          </TouchableOpacity>
        </View>

        {/* Activity History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <History size={20} color="#333" />
            <Text style={styles.sectionTitle}>Actividad Reciente</Text>
          </View>

          <View style={styles.historyCard}>
            {history.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.historyItem,
                  index !== history.length - 1 && styles.historyItemBorder
                ]}
              >
                <View style={styles.historyInfo}>
                  <Text style={styles.historyAction}>{item.action}</Text>
                  <Text style={styles.historyDate}>{item.date}</Text>
                </View>
                <Text style={styles.historyPoints}>{item.points}</Text>
              </View>
            ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  headerAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9ccc65',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  pointsCard: {
    backgroundColor: '#9ccc65',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  pointsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  pointsLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
  },
  changeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  changeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  changeLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: -8,
  },
  pointsSubtext: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  levelCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  levelIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f1f8e9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  levelSubtext: {
    fontSize: 13,
    color: '#666',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#9ccc65',
    borderRadius: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f5f5f5',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rewardContent: {
    flex: 1,
    marginRight: 16,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 6,
    lineHeight: 18,
  },
  rewardMerchant: {
    fontSize: 12,
    color: '#9ccc65',
    fontWeight: '500',
  },
  rewardRight: {
    alignItems: 'center',
    gap: 8,
  },
  pointsRequiredBadge: {
    backgroundColor: '#f1f8e9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  pointsRequiredText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#689f38',
  },
  pointsRequiredLabel: {
    fontSize: 10,
    color: '#689f38',
  },
  viewAllButton: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  viewAllButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  historyItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyInfo: {
    flex: 1,
  },
  historyAction: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 2,
  },
  historyDate: {
    fontSize: 12,
    color: '#999',
  },
  historyPoints: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9ccc65',
  },
});