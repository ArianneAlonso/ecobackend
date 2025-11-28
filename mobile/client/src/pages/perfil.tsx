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
import { Award, TrendingUp, History, Settings } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

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

interface Stat {
  label: string;
  value: string;
  icon: any;
}

const stats: Stat[] = [
  { label: 'Retiros', value: '12', icon: Award },
  { label: 'Eventos', value: '4', icon: Award },
  { label: 'Kg reciclados', value: '36', icon: Award },
];

export default function Points() {
  const navigation = useNavigation<any>();

  const currentPoints = 1250;
  const pointsChange = 85;
  const currentLevel = 'Eco Warrior';
  const pointsToNextLevel = 750;
  const levelProgress = 62;

  const goToConfig = () => {
    navigation.navigate('Configuracion');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
        <TouchableOpacity onPress={goToConfig} style={styles.headerIconButton}>
          <Settings size={22} color="#4caf50" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Perfil compacto arriba */}
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
            <Award size={16} color="#ffffff" />
            <Text style={styles.profileBadgeText}>Top Reciclador</Text>
          </View>
        </View>

        {/* Tarjeta de puntos */}
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

        {/* Nivel */}
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <View style={styles.levelIconContainer}>
              <TrendingUp size={20} color="#388e3c" />
            </View>
            <View style={styles.levelInfo}>
              <Text style={styles.levelTitle}>Nivel: {currentLevel}</Text>
              <Text style={styles.levelSubtext}>
                Solo {pointsToNextLevel} pts para subir de nivel
              </Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View
              style={[styles.progressFill, { width: `${levelProgress}%` }]}
            />
          </View>
        </View>

        {/* Stats detallados */}
        <View style={styles.profileDetailCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarBig}>
              <Text style={styles.avatarText}>E</Text>
            </View>
            <View style={styles.profileInfoDetail}>
              <Text style={styles.userName}>Eco Héroe</Text>
              <Text style={styles.userEmail}>usuario@ecoresiduos.com</Text>
              <View style={styles.levelBadgeDetail}>
                <Award size={14} color="#2e7d32" />
                <Text style={styles.levelBadgeTextDetail}>{currentLevel}</Text>
              </View>
            </View>
          </View>

          <View style={styles.statsGrid}>
            {stats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <View key={stat.label} style={styles.statItem}>
                  <View style={styles.statIconContainer}>
                    <IconComponent size={24} color="#66bb6a" />
                  </View>
                  <Text style={styles.statValue}>{stat.value}</Text>
                  <Text style={styles.statLabel}>{stat.label}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Ranking */}
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

        {/* Historial */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionHeaderLeft}>
              <History size={20} color="#33691e" />
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
    backgroundColor: '#f4f9f1',
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
    color: '#1b5e20',
  },
  headerIconButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 80,
  },

  /* Profile compacto */
  profileCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e6f4d7',
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
    color: '#2e7d32',
  },
  profileLevel: {
    fontSize: 13,
    color: '#558b2f',
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#43a047',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    gap: 6,
  },
  profileBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },

  /* Points card */
  pointsCard: {
    backgroundColor: '#9ccc65',
    borderRadius: 24,
    padding: 24,
    marginBottom: 16,
    shadowColor: '#2e7d32',
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
    color: '#ffffff',
  },
  changeLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  pointsValue: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: -4,
  },
  pointsSubtext: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },

  /* Level */
  levelCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000000',
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
    backgroundColor: '#e6f4d7',
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
    color: '#2e7d32',
    marginBottom: 2,
  },
  levelSubtext: {
    fontSize: 13,
    color: '#558b2f',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#66bb6a',
    borderRadius: 4,
  },

  /* Profile detail + stats */
  profileDetailCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarBig: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#9ccc65',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  avatarText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  profileInfoDetail: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1b5e20',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#558b2f',
    marginBottom: 8,
  },
  levelBadgeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#e6f4d7',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  levelBadgeTextDetail: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2e7d32',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f8e9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2e7d32',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#558b2f',
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
    color: '#2e7d32',
  },

  /* Ranking */
  rankingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    shadowColor: '#000000',
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
    color: '#9e9e9e',
  },
  rankingName: {
    flex: 1,
    fontSize: 14,
    color: '#37474f',
  },
  rankingPoints: {
    fontSize: 13,
    fontWeight: '600',
    color: '#455a64',
  },
  rankingPositionSelf: {
    width: 22,
    fontSize: 14,
    fontWeight: '700',
    color: '#388e3c',
  },
  rankingNameSelf: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#388e3c',
  },
  rankingPointsSelf: {
    fontSize: 13,
    fontWeight: '700',
    color: '#388e3c',
  },

  /* History */
  historyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000000',
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
    borderBottomColor: '#e0f2f1',
  },
  historyInfo: {
    flex: 1,
  },
  historyAction: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2e7d32',
    marginBottom: 2,
  },
  historyDate: {
    fontSize: 12,
    color: '#78909c',
  },
  historyPoints: {
    fontSize: 14,
    fontWeight: '600',
    color: '#43a047',
  },
});
