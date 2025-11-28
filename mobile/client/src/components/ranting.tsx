// components/ranking.tsx
import React from 'react';
import { View, Text, FlatList } from 'react-native';

// Fake data ejemplo
const clubs = [
  {
    name: 'EcoPower',
    points: 12950,
    members: 20,
    medals: 'SS',
    recycledKg: 420,
  },
  {
    name: 'GreenForce',
    points: 10920,
    members: 18,
    medals: 'S',
    recycledKg: 375,
  },
];

export default function ClubRankingScreen() {
  return (
    <View className="bg-white flex-1 p-4">
      <Text className="text-xl font-bold mb-4 text-green-600">
        Ranking de Clubs Noviembre 2025
      </Text>
      <FlatList
        data={clubs}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => (
          <View className="border-b border-gray-200 py-2 flex-row items-center">
            <Text className="text-lg font-semibold mr-2">{index + 1}.</Text>
            <View className="flex-1">
              <Text className="text-green-700 font-bold">{item.name}</Text>
              <Text className="text-xs text-gray-500">
                Miembros: {item.members} | Reciclaje: {item.recycledKg}kg
              </Text>
              <Text className="text-xs text-yellow-500">
                Puntos: {item.points} | Medalla: {item.medals}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
