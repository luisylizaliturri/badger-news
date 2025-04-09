import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import BadgerNewsStack from './BadgerNewsStack';
import BadgerPreferencesScreen from '../screens/BadgerPreferencesScreen';

const Tab = createBottomTabNavigator();

function BadgerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'News') {
            iconName = focused ? 'newspaper' : 'newspaper-outline';
          } else if (route.name === 'Preferences') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'red', 
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="News" 
        component={BadgerNewsStack} 
        options={{
          headerShown: false
        }}
      />
      <Tab.Screen 
        name="Preferences" 
        component={BadgerPreferencesScreen}
        options={{
          title: 'Preferences',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default BadgerTabs;