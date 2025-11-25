// screens/ClubRanking.tsx
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { tw } from 'nativewind';

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
    <View style={tw`bg-white flex-1 p-4`}>
      <Text style={tw`text-xl font-bold mb-4 text-green-600`}>Ranking de Clubs Noviembre 2025</Text>
      <FlatList
        data={clubs}
        keyExtractor={(item) => item.name}
        renderItem={({ item, index }) => (
          <View style={tw`border-b border-gray-200 py-2 flex-row items-center`}>
            <Text style={tw`text-lg font-semibold mr-2`}>{index + 1}.</Text>
            <View style={tw`flex-1`}>
              <Text style={tw`text-green-700 font-bold`}>{item.name}</Text>
              <Text style={tw`text-xs text-gray-500`}>Miembros: {item.members} | Reciclaje: {item.recycledKg}kg</Text>
              <Text style={tw`text-xs text-yellow-500`}>Puntos: {item.points} | Medalla: {item.medals}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
