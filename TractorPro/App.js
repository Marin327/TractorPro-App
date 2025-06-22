import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './components/Home';
import AddClient from './components/AddClient';
import Contact from './components/Contact';
import LoadingScreen from './components/LoadingScreen';
import Money from './components/Money';
import MovingTractor from './components/MovingTractor';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Loading"
          screenOptions={{
            headerStyle: { backgroundColor: '#e6f0ff' },
            headerTintColor: '#003366',
            headerTitleStyle: { fontWeight: 'bold' },
          }}
        >
          <Stack.Screen
            name="Loading"
            component={LoadingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: 'Начало' }}
          />
          <Stack.Screen
            name="AddClient"
            component={AddClient}
            options={{ title: 'Запази час' }}
          />
          <Stack.Screen
            name="Contact"
            component={Contact}
            options={{ title: 'Контакти' }}
          />
          <Stack.Screen
            name="Money"
            component={Money}
            options={{ title: 'Ценоразпис' }}
          />
        </Stack.Navigator>
      </NavigationContainer>

      {/* Тук долу под навигацията слагаш движещия се трактор */}
      <MovingTractor />
    </View>
  );
}
