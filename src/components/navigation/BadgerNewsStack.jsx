import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BadgerNewsScreen from '../screens/BadgerNewsScreen';
import BadgerArticleScreen from '../screens/BadgerArticleScreen';

const Stack = createNativeStackNavigator();

function BadgerNewsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="NewsFeed"
        component={BadgerNewsScreen}
        options={{ 
          title: 'Badger News',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen 
        name="Article" 
        component={BadgerArticleScreen}
        options={{ 
          title: 'Article',
          headerStyle: {
            backgroundColor: 'red',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default BadgerNewsStack; 