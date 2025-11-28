import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Search, Filter, Navigation, Clock } from 'lucide-react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

interface Container {
  id: string;
  type: string;
  address: string;
  materials: string[];
  distance: string;
  schedule: string;
  latitude?: number;
  longitude?: number;
}

const containers: Container[] = [
  {
    id: '1',
    type: 'Contenedor Verde',
    address: 'Av. Principal 123',
    materials: ['Plástico', 'Vidrio', 'Papel'],
    distance: '0.5 km',
    schedule: 'Lun - Vie: 7:00 AM - 6:00 PM',
    latitude: -26.1855,
    longitude: -58.1755,
  },
  {
    id: '2',
    type: 'Punto Ecológico',
    address: 'Plaza Central',
    materials: ['Electrónicos', 'Baterías'],
    distance: '1.2 km',
    schedule: 'Mar y Jue: 9:00 AM - 5:00 PM',
    latitude: -26.1875,
    longitude: -58.1735,
  },
  {
    id: '3',
    type: 'Contenedor Azul',
    address: 'Calle Secundaria 456',
    materials: ['Papel', 'Cartón'],
    distance: '0.8 km',
    schedule: 'Lun - Sáb: 8:00 AM - 8:00 PM',
    latitude: -26.1865,
    longitude: -58.1765,
  },
];

const filterOptions = ['Todos', 'Plástico', 'Vidrio', 'Papel', 'Electrónicos'];

export default function Map() {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [selectedContainer, setSelectedContainer] = useState<string | null>(
    null
  );

  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Mapa de contenedores</Text>
          <Text style={styles.headerSubtitle}>
            Encuentra los puntos verdes más cercanos
          </Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={22} color="#1b5e20" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Search size={20} color="#78909c" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por dirección o tipo..."
              placeholderTextColor="#90a4ae"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {filterOptions.map((filter, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.filterChip,
                selectedFilter === filter && styles.filterChipActive,
              ]}
              onPress={() => handleFilterPress(filter)}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilter === filter && styles.filterChipTextActive,
                ]}
              >
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: -26.1855,
              longitude: -58.1755,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation
            showsMyLocationButton
          >
            {containers.map((container) => (
              <Marker
                key={container.id}
                coordinate={{
                  latitude: container.latitude || -26.1855,
                  longitude: container.longitude || -58.1755,
                }}
                title={container.type}
                description={container.address}
                onPress={() => setSelectedContainer(container.id)}
              >
                <View style={styles.markerContainer}>
                  <MapPin size={32} color="#9ccc65" fill="#9ccc65" />
                </View>
              </Marker>
            ))}
          </MapView>
        </View>

        <View style={styles.containersSection}>
          <Text style={styles.sectionTitle}>Contenedores cercanos</Text>

          {containers.map((container) => (
            <TouchableOpacity
              key={container.id}
              style={[
                styles.containerCard,
                selectedContainer === container.id &&
                  styles.containerCardSelected,
              ]}
              activeOpacity={0.7}
              onPress={() => setSelectedContainer(container.id)}
            >
              <View style={styles.containerHeader}>
                <View style={styles.containerIcon}>
                  <MapPin size={22} color="#43a047" />
                </View>
                <View style={styles.containerInfo}>
                  <Text style={styles.containerType}>{container.type}</Text>
                  <Text style={styles.containerAddress}>
                    {container.address}
                  </Text>
                </View>
                <View style={styles.distanceBadge}>
                  <Text style={styles.distanceText}>{container.distance}</Text>
                </View>
              </View>

              <View style={styles.containerDetails}>
                <View style={styles.scheduleRow}>
                  <Clock size={16} color="#558b2f" />
                  <Text style={styles.scheduleText}>{container.schedule}</Text>
                </View>

                <View style={styles.materialsRow}>
                  <Text style={styles.materialsLabel}>Materiales:</Text>
                  <View style={styles.materialsChips}>
                    {container.materials.map((material, index) => (
                      <View key={index} style={styles.materialChip}>
                        <Text style={styles.materialText}>{material}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.directionsButton}>
                <Navigation size={16} color="#2e7d32" />
                <Text style={styles.directionsButtonText}>Cómo llegar</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
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
    backgroundColor: '#9ccc65',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    marginTop: 2,
  },
  filterButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f2dd',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#1b5e20',
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 8,
  },
  filterChip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f1f8e9',
    borderWidth: 1,
    borderColor: '#c5e1a5',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#9ccc65',
    borderColor: '#9ccc65',
  },
  filterChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#33691e',
  },
  filterChipTextActive: {
    color: '#ffffff',
  },
  mapContainer: {
    height: 260,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#e8f5e9',
    borderWidth: 1,
    borderColor: '#c5e1a5',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  containersSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: 16,
  },
  containerCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#e0f2f1',
  },
  containerCardSelected: {
    borderColor: '#9ccc65',
    shadowOpacity: 0.16,
  },
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  containerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e6f4d7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  containerInfo: {
    flex: 1,
  },
  containerType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1b5e20',
    marginBottom: 2,
  },
  containerAddress: {
    fontSize: 13,
    color: '#546e7a',
  },
  distanceBadge: {
    backgroundColor: '#f1f8e9',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  distanceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#558b2f',
  },
  containerDetails: {
    gap: 10,
    marginBottom: 12,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scheduleText: {
    fontSize: 13,
    color: '#455a64',
  },
  materialsRow: {
    gap: 6,
  },
  materialsLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2e7d32',
  },
  materialsChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  materialChip: {
    backgroundColor: '#e6f4d7',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#9ccc65',
  },
  materialText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#33691e',
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#e6f4d7',
    paddingVertical: 10,
    borderRadius: 10,
  },
  directionsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2e7d32',
  },
});
