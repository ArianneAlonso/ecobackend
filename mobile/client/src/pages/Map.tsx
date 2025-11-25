import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Animated,
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
    id: "1",
    type: "Contenedor Verde",
    address: "Av. Principal 123",
    materials: ["Plástico", "Vidrio", "Papel"],
    distance: "0.5 km",
    schedule: "Lun - Vie: 7:00 AM - 6:00 PM",
    latitude: -26.1855,
    longitude: -58.1755,
  },
  {
    id: "2",
    type: "Punto Ecológico",
    address: "Plaza Central",
    materials: ["Electrónicos", "Baterías"],
    distance: "1.2 km",
    schedule: "Mar y Jue: 9:00 AM - 5:00 PM",
    latitude: -26.1875,
    longitude: -58.1735,
  },
  {
    id: "3",
    type: "Contenedor Azul",
    address: "Calle Secundaria 456",
    materials: ["Papel", "Cartón"],
    distance: "0.8 km",
    schedule: "Lun - Sáb: 8:00 AM - 8:00 PM",
    latitude: -26.1865,
    longitude: -58.1765,
  },
];

const filterOptions = ["Todos", "Plástico", "Vidrio", "Papel", "Electrónicos"];

export default function Map() {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todos');
  const [selectedContainer, setSelectedContainer] = useState<string | null>(null);

  const handleFilterPress = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mapa de Contenedores</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Search size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar por dirección..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Filters */}
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
                selectedFilter === filter && styles.filterChipActive
              ]}
              onPress={() => handleFilterPress(filter)}
            >
              <Text style={[
                styles.filterChipText,
                selectedFilter === filter && styles.filterChipTextActive
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Map */}
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

        {/* Containers List */}
        <View style={styles.containersSection}>
          <Text style={styles.sectionTitle}>Contenedores Cercanos</Text>
          
          {containers.map((container) => (
            <TouchableOpacity
              key={container.id}
              style={[
                styles.containerCard,
                selectedContainer === container.id && styles.containerCardSelected
              ]}
              activeOpacity={0.7}
              onPress={() => setSelectedContainer(container.id)}
            >
              <View style={styles.containerHeader}>
                <View style={styles.containerIcon}>
                  <MapPin size={24} color="#9ccc65" />
                </View>
                <View style={styles.containerInfo}>
                  <Text style={styles.containerType}>{container.type}</Text>
                  <Text style={styles.containerAddress}>{container.address}</Text>
                </View>
                <View style={styles.distanceBadge}>
                  <Text style={styles.distanceText}>{container.distance}</Text>
                </View>
              </View>

              <View style={styles.containerDetails}>
                <View style={styles.scheduleRow}>
                  <Clock size={16} color="#666" />
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
                <Navigation size={16} color="#9ccc65" />
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
  filterButton: {
    padding: 8,
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
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
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
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#9ccc65',
    borderColor: '#9ccc65',
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  filterChipTextActive: {
    color: '#fff',
  },
  mapContainer: {
    height: 250,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f5f5f5',
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
    color: '#333',
    marginBottom: 16,
  },
  containerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  containerCardSelected: {
    borderColor: '#9ccc65',
  },
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  containerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f8e9',
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
    color: '#333',
    marginBottom: 4,
  },
  containerAddress: {
    fontSize: 14,
    color: '#666',
  },
  distanceBadge: {
    backgroundColor: '#f1f8e9',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  distanceText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#689f38',
  },
  containerDetails: {
    gap: 12,
    marginBottom: 12,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  scheduleText: {
    fontSize: 13,
    color: '#666',
  },
  materialsRow: {
    gap: 8,
  },
  materialsLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  materialsChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  materialChip: {
    backgroundColor: '#f1f8e9',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#9ccc65',
  },
  materialText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#689f38',
  },
  directionsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#f1f8e9',
    paddingVertical: 10,
    borderRadius: 8,
  },
  directionsButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#689f38',
  },
});