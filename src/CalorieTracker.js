import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const CalorieTracker = () => {
    const [food, setFood] = useState('');
    const [amount, setAmount] = useState('');
    const [unit, setUnit] = useState('');  // Stores whether it's in grams or servings
    const [foodLog, setFoodLog] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Nutritionix API details
    const API_URL = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
    const APP_ID = 'f9f1895e';
    const APP_KEY = 'c8cdaff4b8d656b4b7f9d0e53405f424';

    // Function to add food and fetch calories
    const addFood = async () => {
        if (food) {
            setLoading(true);
            setError('');
    
            try {
                // POST request to Nutritionix API
                const response = await axios.post(
                    API_URL,
                    { query: food },  // Sending food item as the "query"
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'x-app-id': APP_ID,
                            'x-app-key': APP_KEY,
                        }
                    }
                );
                
                const item = response.data.foods[0];
                if (item) {
                    const suggestedUnit = item.serving_unit.toLowerCase();  // Unit from API response (e.g., "grams", "servings")
                    setUnit(suggestedUnit);

                    // Only add food when both amount and unit are filled
                    if (amount) {
                        const totalCalories = (item.nf_calories * parseFloat(amount));  // Adjust calories based on amount
                        setFoodLog([...foodLog, { id: Date.now().toString(), food: item.food_name, calories: totalCalories, amount, unit: suggestedUnit }]);
                        setFood('');
                        setAmount('');
                        setUnit('');
                    }
                } else {
                    setError('Food item not found.');
                }
            } catch (err) {
                console.error('API request error:', err);  // Log detailed error
                setError('Failed to fetch data. Please check your network connection or API credentials.');
            } finally {
                setLoading(false);
            }
        } else {
            setError('Please enter a food item.');
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

            {/* Only show amount input if the unit has been determined */}
            {unit && (
                <TextInput
                    style={styles.input}
                    value={amount}
                    onChangeText={setAmount}
                    placeholder={`Enter amount in ${unit}`}  // Dynamically update placeholder
                    keyboardType="numeric"
                />
            )}

            <TouchableOpacity style={styles.button} onPress={addFood} disabled={loading}>
                <Text style={styles.buttonText}>Add Food</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator size="large" color="#2c6975" />}

            {error ? (
                <Text style={styles.errorText}>{error}</Text>
            ) : (
                <FlatList
                    data={foodLog}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Text style={styles.logItem}>
                            {item.amount} {item.unit} of {item.food}: {item.calories.toFixed(2)} cal
                        </Text>
                    )}
                />
            )}

            <Text style={styles.totalCalories}>Total Calories: {totalCalories.toFixed(2)} cal</Text>
        </View>
    );
};

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
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 10,
    },
});

export default CalorieTracker;
