import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BmiCalculator from './src';

export default function App() {
  return (
    <View style={styles.container}>
      <BmiCalculator/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
