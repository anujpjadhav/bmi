import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BmiCalculator from './src/BmiCalculator';
import CalorieTracker from './src/CalorieTracker';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BmiCalculator">
        <Stack.Screen name="BmiCalculator" component={BmiCalculator} />
        <Stack.Screen name="CalorieTracker" component={CalorieTracker} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

