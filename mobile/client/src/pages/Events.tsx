import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, MapPin, Users } from 'lucide-react-native';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  attendees: number;
}

const events: Event[] = [
  {
    id: '1',
    title: 'Jornada de Limpieza',
    date: 'Sábado, 5 de Noviembre - 9:00 AM',
    location: 'Plaza Central',
    description:
      'Únete a nuestra jornada de limpieza comunitaria y gana puntos extra por participar',
    attendees: 45,
  },
  {
    id: '2',
    title: 'Taller de Reciclaje',
    date: 'Miércoles, 10 de Noviembre - 3:00 PM',
    location: 'Centro Comunitario',
    description:
      'Aprende técnicas avanzadas de separación de residuos y reciclaje creativo',
    attendees: 28,
  },
  {
    id: '3',
    title: 'Feria Eco-Sostenible',
    date: 'Domingo, 15 de Noviembre - 10:00 AM',
    location: 'Parque Municipal',
    description:
      'Conoce productos sustentables y participa en actividades ecológicas para toda la familia',
    attendees: 120,
  },
];

const upcomingDays = [
  { day: 'Lun', date: '1', hasEvent: false },
  { day: 'Mar', date: '2', hasEvent: false },
  { day: 'Mié', date: '3', hasEvent: false },
  { day: 'Jue', date: '4', hasEvent: false },
  { day: 'Vie', date: '5', hasEvent: true },
  { day: 'Sáb', date: '6', hasEvent: false },
  { day: 'Dom', date: '7', hasEvent: false },
];

export default function Events() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Eventos Ambientales</Text>
          <Text style={styles.headerSubtitle}>
            Participa y suma EcoPuntos en cada actividad
          </Text>
        </View>

        <View style={styles.content}>
          {/* Tarjeta calendario */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Calendar size={20} color="#388e3c" />
              <Text style={styles.cardTitle}>Noviembre 2025</Text>
            </View>

            <View style={styles.calendarGrid}>
              {upcomingDays.map((day, index) => (
                <View
                  key={index}
                  style={[
                    styles.dayCell,
                    day.hasEvent ? styles.dayCellActive : styles.dayCellInactive,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      day.hasEvent && styles.dayTextActive,
                    ]}
                  >
                    {day.day}
                  </Text>
                  <Text
                    style={[
                      styles.dateText,
                      day.hasEvent && styles.dateTextActive,
                    ]}
                  >
                    {day.date}
                  </Text>
                  {day.hasEvent && <View style={styles.eventDot} />}
                </View>
              ))}
            </View>
          </View>

          {/* Lista de eventos */}
          <View style={styles.eventsSection}>
            <View style={styles.eventsSectionHeader}>
              <Text style={styles.sectionTitle}>Próximos eventos</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{events.length} eventos</Text>
              </View>
            </View>

            {events.map((event) => (
              <TouchableOpacity
                key={event.id}
                style={styles.eventCard}
                activeOpacity={0.7}
              >
                <View style={styles.eventCardContent}>
                  <Text style={styles.eventTitle}>{event.title}</Text>

                  <View style={styles.eventInfo}>
                    <Calendar size={14} color="#558b2f" />
                    <Text style={styles.eventInfoText}>{event.date}</Text>
                  </View>

                  <View style={styles.eventInfo}>
                    <MapPin size={14} color="#558b2f" />
                    <Text style={styles.eventInfoText}>{event.location}</Text>
                  </View>

                  <Text style={styles.eventDescription} numberOfLines={2}>
                    {event.description}
                  </Text>

                  <View style={styles.eventInfo}>
                    <Users size={16} color="#2e7d32" />
                    <Text style={styles.eventInfoTextStrong}>
                      {event.attendees} personas confirmadas
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#9ccc65',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
  },
  content: {
    padding: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2e7d32',
  },
  calendarGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  dayCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 10,
  },
  dayCellActive: {
    backgroundColor: '#9ccc65',
  },
  dayCellInactive: {
    backgroundColor: '#e8f2dd',
  },
  dayText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#33691e',
    marginBottom: 4,
  },
  dayTextActive: {
    color: '#ffffff',
  },
  dateText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#33691e',
  },
  dateTextActive: {
    color: '#ffffff',
  },
  eventDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ffffff',
    marginTop: 4,
  },
  eventsSection: {
    marginTop: 8,
  },
  eventsSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e7d32',
  },
  badge: {
    backgroundColor: '#e6f4d7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#33691e',
  },
  eventCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0f2f1',
  },
  eventCardContent: {
    gap: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1b5e20',
    marginBottom: 4,
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventInfoText: {
    fontSize: 12,
    color: '#558b2f',
  },
  eventInfoTextStrong: {
    fontSize: 12,
    color: '#2e7d32',
    fontWeight: '600',
  },
  eventDescription: {
    fontSize: 13,
    color: '#455a64',
    lineHeight: 18,
    marginTop: 4,
  },
});
