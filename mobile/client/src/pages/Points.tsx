import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Award, TrendingUp, History } from 'lucide-react-native';

interface HistoryItem {
  date: string;
  action: string;
  points: string;
}

const history: HistoryItem[] = [
  { date: '28 Oct', action: 'Retiro completado', points: '+50' },
  { date: '25 Oct', action: 'Evento asistido', points: '+100' },
  { date: '22 Oct', action: 'Retiro completado', points: '+50' },
  { date: '20 Oct', action: 'Bono semanal', points: '+25' },
];

export default function Points() {
  const currentPoints = 1250;
  const pointsChange = 85;
  const currentLevel = 'Eco Warrior';
  const pointsToNextLevel = 750;
  const levelProgress = 62; // porcentaje

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis EcoPuntos</Text>
        <TouchableOpacity>
          <Text style={styles.headerAction}>Historial</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Profile / Gamification */}
        <View style={styles.profileCard}>
          <View style={styles.profileLeft}>
            <Image
              source={{
                uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
              }}
              style={styles.avatar}
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Eco Héroe</Text>
              <Text style={styles.profileLevel}>{currentLevel}</Text>
            </View>
          </View>
          <View style={styles.profileBadge}>
            <Award size={16} color="#fff" />
            <Text style={styles.profileBadgeText}>Top Reciclador</Text>
          </View>
        </View>

        {/* Points Card */}
        <View style={styles.pointsCard}>
          <View style={styles.pointsHeader}>
            <Text style={styles.pointsLabel}>Tus EcoPuntos</Text>
            <View style={styles.changeContainer}>
              <Text style={styles.changeText}>+{pointsChange}</Text>
              <Text style={styles.changeLabel}>esta semana</Text>
            </View>
          </View>
          <Text style={styles.pointsValue}>
            {currentPoints.toLocaleString()}
          </Text>
          <Text style={styles.pointsSubtext}>pts disponibles para canjear</Text>
        </View>

        {/* Level Card */}
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <View style={styles.levelIconContainer}>
              <TrendingUp size={20} color="#ff6f91" />
            </View>
            <View style={styles.levelInfo}>
              <Text style={styles.levelTitle}>Nivel: {currentLevel}</Text>
              <Text style={styles.levelSubtext}>
                Solo {pointsToNextLevel} pts para ser “Héroe del Reciclaje”
              </Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${levelProgress}%` }]}
            />
          </View>
        </View>

        {/* Simple Local Ranking */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top recicladores del mes</Text>
          <View style={styles.rankingCard}>
            <View style={styles.rankingRow}>
              <Text style={styles.rankingPosition}>1</Text>
              <Text style={styles.rankingName}>Ana</Text>
              <Text style={styles.rankingPoints}>1.560 pts</Text>
            </View>
            <View style={styles.rankingRow}>
              <Text style={styles.rankingPosition}>2</Text>
              <Text style={styles.rankingName}>Luis</Text>
              <Text style={styles.rankingPoints}>1.320 pts</Text>
            </View>
            <View style={styles.rankingRow}>
              <Text style={styles.rankingPositionSelf}>3</Text>
              <Text style={styles.rankingNameSelf}>Tú</Text>
              <Text style={styles.rankingPointsSelf}>
                {currentPoints} pts
              </Text>
            </View>
          </View>
        </View>

        {/* Activity History */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <History size={20} color="#333" />
              <Text style={styles.sectionTitle}>Actividad reciente</Text>
            </View>
          </View>

          <View style={styles.historyCard}>
            {history.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.historyItem,
                  index !== history.length - 1 && styles.historyItemBorder,
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
    backgroundColor: '#fff7fb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  headerAction: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ff6f91',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 80,
  },

  /* Profile */
  profileCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffe4ec',
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    marginRight: 12,
  },
  profileInfo: {
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  profileLevel: {
    fontSize: 13,
    color: '#777',
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6f91',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    gap: 6,
  },
  profileBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },

  /* Points card */
  pointsCard: {
    backgroundColor: '#ff6f91',
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#ff6f91',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
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
    fontSize: 44,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: -4,
  },
  pointsSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },

  /* Level */
  levelCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
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
    backgroundColor: '#ffe4ec',
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
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#ff6f91',
    borderRadius: 4,
  },

  /* Sections */
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },

  /* Ranking */
  rankingCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  rankingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  rankingPosition: {
    width: 22,
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  rankingName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  rankingPoints: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555',
  },
  rankingPositionSelf: {
    width: 22,
    fontSize: 14,
    fontWeight: '700',
    color: '#ff6f91',
  },
  rankingNameSelf: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#ff6f91',
  },
  rankingPointsSelf: {
    fontSize: 13,
    fontWeight: '700',
    color: '#ff6f91',
  },

  /* History */
  historyCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
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
    borderBottomColor: '#f5e1ec',
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
    color: '#ff6f91',
  },
});
