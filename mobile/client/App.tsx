import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, MapPin, Calendar, Award, User } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LoginRegisterScreen from './src/pages/LoginRegisterScreen';
import Homepage from './src/pages/Home';
import Map from './src/pages/Map';
import Events from './src/pages/Events';
import Points from './src/pages/perfil';
import PickupRequest from './src/pages/PickupRequest';
import Tips from './src/pages/Tips';
import WelcomeScreen from './src/pages/WelcomeScreen';

const AuthStack = createNativeStackNavigator();
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Login" component={LoginRegisterScreen} /> 
    </AuthStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function MainTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#9ccc65',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: 8 + insets.bottom,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          backgroundColor: '#fff',
        },
        tabBarIcon: ({ focused, size }) => {
          let IconComponent;
          let iconName;

          switch (route.name) {
            case 'HomeTab':
              IconComponent = Home;
              iconName = 'Inicio';
              break;
            case 'MapTab':
              IconComponent = MapPin;
              iconName = 'Mapa';
              break;
            case 'EventsTab':
              IconComponent = Calendar;
              iconName = 'Eventos';
              break;
            case 'PointsTab':
              IconComponent = Award;
              iconName = 'Perfil';
              break;
            default:
              IconComponent = Home;
              iconName = 'Inicio';
          }

          return <IconComponent size={size} color={focused ? '#9ccc65' : '#666'} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={Homepage}
        options={{ tabBarLabel: 'Inicio' }}
      />
      <Tab.Screen
        name="MapTab"
        component={Map}
        options={{ tabBarLabel: 'Mapa' }}
      />
      <Tab.Screen
        name="EventsTab"
        component={Events}
        options={{ tabBarLabel: 'Eventos' }}
      />
      <Tab.Screen
        name="PointsTab"
        component={Points}
        options={{ tabBarLabel: 'Perfil' }}
      />
    </Tab.Navigator>
  );
}

const RootStack = createNativeStackNavigator();
function RootNavigator() {
  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="Main" component={MainTabs} /> 
      <RootStack.Screen 
        name="Pickup" 
        component={PickupRequest}
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
      <RootStack.Screen 
        name="Tips" 
        component={Tips}
      />
      <RootStack.Screen 
        name="ConductorHome" 
        component={Homepage}
      /> 
    </RootStack.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setIsAuthenticated(!!token); 
    } catch (error) {
      console.error('Error checking auth status:', error);
      setIsAuthenticated(false);
    }
  };
  if (isAuthenticated === null) {
    return null; 
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        {isAuthenticated ? <RootNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </>
  );
}