import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Picker } from '@react-native-picker/picker';

const BmiCalculator = ({ navigation }) => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState(''); // Added description state

    const dietPlans = {
        underweight: `
            <h2>Diet Plan for Underweight</h2>
            <table border="1" style="width:100%; border-collapse: collapse;">
                <tr>
                    <th>Meal</th>
                    <th>Food Items</th>
                </tr>
                <tr>
                    <td>Breakfast</td>
                    <td>High-calorie smoothie, eggs, avocado</td>
                </tr>
                <tr>
                    <td>Lunch</td>
                    <td>Chicken sandwich, salad with nuts</td>
                </tr>
                <tr>
                    <td>Snack</td>
                    <td>Greek yogurt with honey, mixed nuts</td>
                </tr>
                <tr>
                    <td>Dinner</td>
                    <td>Grilled salmon, quinoa, steamed vegetables</td>
                </tr>
                <tr>
                    <td>Evening Snack</td>
                    <td>Peanut butter on whole grain toast</td>
                </tr>
            </table>
        `,
        normal: `
            <h2>Diet Plan for Normal</h2>
            <table border="1" style="width:100%; border-collapse: collapse;">
                <tr>
                    <th>Meal</th>
                    <th>Food Items</th>
                </tr>
                <tr>
                    <td>Breakfast</td>
                    <td>Oatmeal with fruit, nuts, and yogurt</td>
                </tr>
                <tr>
                    <td>Lunch</td>
                    <td>Grilled chicken salad with mixed greens</td>
                </tr>
                <tr>
                    <td>Snack</td>
                    <td>Apple slices with almond butter</td>
                </tr>
                <tr>
                    <td>Dinner</td>
                    <td>Baked fish with vegetables and brown rice</td>
                </tr>
                <tr>
                    <td>Evening Snack</td>
                    <td>Handful of mixed nuts</td>
                </tr>
            </table>
        `,
        overweight: `
            <h2>Diet Plan for Overweight</h2>
            <table border="1" style="width:100%; border-collapse: collapse;">
                <tr>
                    <th>Meal</th>
                    <th>Food Items</th>
                </tr>
                <tr>
                    <td>Breakfast</td>
                    <td>Greek yogurt with berries and chia seeds</td>
                </tr>
                <tr>
                    <td>Lunch</td>
                    <td>Quinoa salad with vegetables and chickpeas</td>
                </tr>
                <tr>
                    <td>Snack</td>
                    <td>Carrot sticks with hummus</td>
                </tr>
                <tr>
                    <td>Dinner</td>
                    <td>Grilled chicken breast with steamed broccoli</td>
                </tr>
                <tr>
                    <td>Evening Snack</td>
                    <td>Small apple or pear</td>
                </tr>
            </table>
        `,
        obese: `
            <h2>Diet Plan for Obese</h2>
            <table border="1" style="width:100%; border-collapse: collapse;">
                <tr>
                    <th>Meal</th>
                    <th>Food Items</th>
                </tr>
                <tr>
                    <td>Breakfast</td>
                    <td>Smoothie with spinach, banana, and protein powder</td>
                </tr>
                <tr>
                    <td>Lunch</td>
                    <td>Mixed green salad with grilled turkey</td>
                </tr>
                <tr>
                    <td>Snack</td>
                    <td>Celery sticks with almond butter</td>
                </tr>
                <tr>
                    <td>Dinner</td>
                    <td>Baked salmon with asparagus and cauliflower rice</td>
                </tr>
                <tr>
                    <td>Evening Snack</td>
                    <td>Handful of almonds</td>
                </tr>
            </table>
        `
    };

    const calculateBmi = () => {
        const heightInMeters = height / 100;
        const bmiValue = weight / (heightInMeters * heightInMeters);
        setBmi(bmiValue.toFixed(1));

        let bmiCategory = '';
        let descriptionText = '';

        if (bmiValue < 18.5) {
            bmiCategory = 'Underweight';
            descriptionText = "You are Underweight, consume more healthy calories";
        } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
            bmiCategory = 'Normal';
            descriptionText = "You are normal, keep it up and Stay motivated";
        } else if (bmiValue >= 25 && bmiValue <= 29.9) {
            bmiCategory = 'Overweight';
            descriptionText = "You are Overweight, consume fewer calories and burn more";
        } else if (bmiValue >= 30) {
            bmiCategory = 'Obese';
            descriptionText = "Obese, Hit the Gym";
        }

        setCategory(bmiCategory);
        setDescription(descriptionText);
    };

    const generatePdf = async () => {
        let dietPlan = '';

        if (description.includes("Underweight")) {
            dietPlan = dietPlans.underweight;
        } else if (description.includes("normal")) {
            dietPlan = dietPlans.normal;
        } else if (description.includes("Overweight")) {
            dietPlan = dietPlans.overweight;
        } else if (description.includes("Obese")) {
            dietPlan = dietPlans.obese;
        }

        const htmlContent = `
            <html>
            <body>
                <h1>BMI Report</h1>
                <p>Name: ${name}</p>
                <p>Gender: ${gender}</p>
                <p>Height: ${height} cm</p>
                <p>Weight: ${weight} kg</p>
                <p>BMI: ${bmi}</p>
                <p>Category: ${category}</p>
                <h2>Diet Plan</h2>
                ${dietPlan}
            </body>
            </html>
        `;
        const { uri } = await Print.printToFileAsync({ html: htmlContent });
        await Sharing.shareAsync(uri);
    };

    return (
        <View style={styles.container}>
                        <View style={styles.title}>
                <Text style={styles.titleText}>BMI Calculator</Text>
            </View>

            <View style={styles.TextInput}>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your name"
                />

                <Picker
                    selectedValue={gender}
                    style={styles.picker}
                    onValueChange={(itemValue) => setGender(itemValue)}
                >
                    <Picker.Item label="Select Gender" value="" />
                    <Picker.Item label="Male" value="Male" />
                    <Picker.Item label="Female" value="Female" />
                    <Picker.Item label="Other" value="Other" />
                </Picker>

                <TextInput
                    style={styles.input}
                    value={height}
                    onChangeText={setHeight}
                    placeholder="Enter height in cm"
                    keyboardType="numeric"
                />

                <TextInput
                    style={styles.input}
                    value={weight}
                    onChangeText={setWeight}
                    placeholder="Enter weight in kg"
                    keyboardType="numeric"
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={calculateBmi}>
                <Text style={styles.buttonText}>Calculate</Text>
            </TouchableOpacity>

            <View style={styles.resultView}>
                {bmi && (
                    <>
                        <Text style={styles.resultText}>Name: {name}</Text>
                        <Text style={styles.resultText}>Gender: {gender}</Text>
                        <Text style={styles.resultText}>Height: {height} cm</Text>
                        <Text style={styles.resultText}>Weight: {weight} kg</Text>
                        <Text style={styles.resultText}>Your BMI is {bmi} ({category})</Text>
                        <Text style={styles.resultText}>{description}</Text>
                    </>
                )}
            </View>

            <TouchableOpacity style={styles.button} onPress={generatePdf}>
                <Text style={styles.buttonText}>Share PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('CalorieTracker')}
            >
                <Text style={styles.buttonText}>Know Your Calories</Text>
            </TouchableOpacity>
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
        marginBottom: 16,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    TextInput: {
        marginBottom: 16,
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    picker: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
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
    resultView: {
        marginTop: 16,
        alignItems: 'center',
    },
    resultText: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default BmiCalculator;
