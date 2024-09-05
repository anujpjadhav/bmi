import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

const CalorieTracker = () => {
    const [food, setFood] = useState('');
    const [calories, setCalories] = useState('');
    const [foodLog, setFoodLog] = useState([]);

    const addFood = () => {
        if (food && calories) {
            setFoodLog([...foodLog, { id: Date.now().toString(), food, calories: parseInt(calories) }]);
            setFood('');
            setCalories('');
        }
    };

    const totalCalories = foodLog.reduce((total, item) => total + item.calories, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Calorie Tracker</Text>

            <TextInput
                style={styles.input}
                value={food}
                onChangeText={setFood}
                placeholder="Enter food item"
            />

            <TextInput
                style={styles.input}
                value={calories}
                onChangeText={setCalories}
                placeholder="Enter calories"
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={addFood}>
                <Text style={styles.buttonText}>Add Food</Text>
            </TouchableOpacity>

            <FlatList
                data={foodLog}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Text style={styles.logItem}>{item.food}: {item.calories} cal</Text>
                )}
            />

            <Text style={styles.totalCalories}>Total Calories: {totalCalories} cal</Text>
        </View>
    );
};

export default CalorieTracker;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#e0ecde',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#2c6975',
        borderRadius: 5,
        padding: 15,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    logItem: {
        fontSize: 18,
        padding: 8,
    },
    totalCalories: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
});
