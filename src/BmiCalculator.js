import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Picker } from '@react-native-picker/picker';
import ModalComponent from './ModalComponent';  // Import modal component

const BmiCalculator = ({ navigation }) => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState(''); 
    const [modalVisible, setModalVisible] = useState(false);  // Modal state

    const calculateBmi = () => {
        const heightInMeters = height / 100;
        const bmiValue = weight / (heightInMeters * heightInMeters);
        setBmi(bmiValue.toFixed(1));

        let bmiCategory = '';
        let descriptionText = '';

        if (bmiValue < 18.5) {
            bmiCategory = 'Underweight';
            descriptionText = "You are Underweight. Consider incorporating more nutritious foods like nuts, avocados, and lean proteins into your diet to help gain weight in a healthy manner.";
        } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
            bmiCategory = 'Normal';
            descriptionText = "You are in the normal weight range. Maintain a balanced diet with a mix of fruits, vegetables, lean proteins, and whole grains to stay healthy.";
        } else if (bmiValue >= 25 && bmiValue <= 29.9) {
            bmiCategory = 'Overweight';
            descriptionText = "You are Overweight. Try to include more vegetables, fruits, and lean proteins in your meals, and reduce your intake of high-calorie foods.";
        } else if (bmiValue >= 30) {
            bmiCategory = 'Obese';
            descriptionText = "You are Obese. Focus on a diet rich in vegetables, fruits, and lean proteins. Avoid sugary drinks and high-fat foods, and consult with a healthcare professional for a personalized plan.";
        }

        setCategory(bmiCategory);
        setDescription(descriptionText);

        // Show modal
        setModalVisible(true);
    };

    // Generate specific diet plan based on BMI
    const generateDietPlan = () => {
        let dietPlan = '';
        if (category === 'Underweight') {
            dietPlan = `
                <tr><td>Breakfast</td><td>Oats with milk, nuts, and banana</td></tr>
                <tr><td>Lunch</td><td>Chicken or paneer curry, whole wheat chapati, and vegetables</td></tr>
                <tr><td>Snacks</td><td>Nuts and dry fruits smoothie</td></tr>
                <tr><td>Dinner</td><td>Rice, dal, and mixed vegetables</td></tr>
            `;
        } else if (category === 'Normal') {
            dietPlan = `
                <tr><td>Breakfast</td><td>Whole grain toast, eggs, and fruit</td></tr>
                <tr><td>Lunch</td><td>Grilled chicken or tofu salad with olive oil dressing</td></tr>
                <tr><td>Snacks</td><td>Yogurt with fruits and nuts</td></tr>
                <tr><td>Dinner</td><td>Brown rice, grilled vegetables, and fish or paneer</td></tr>
            `;
        } else if (category === 'Overweight') {
            dietPlan = `
                <tr><td>Breakfast</td><td>Fruit smoothie with spinach, chia seeds, and almond milk</td></tr>
                <tr><td>Lunch</td><td>Quinoa salad with beans, chickpeas, and greens</td></tr>
                <tr><td>Snacks</td><td>Carrot sticks with hummus</td></tr>
                <tr><td>Dinner</td><td>Grilled vegetables, lentil soup, and quinoa</td></tr>
            `;
        } else if (category === 'Obese') {
            dietPlan = `
                <tr><td>Breakfast</td><td>Green smoothie with kale, apple, cucumber, and chia seeds</td></tr>
                <tr><td>Lunch</td><td>Grilled chicken or tofu with steamed vegetables</td></tr>
                <tr><td>Snacks</td><td>Fresh vegetable salad with lemon dressing</td></tr>
                <tr><td>Dinner</td><td>Steamed fish, salad, and a small portion of brown rice</td></tr>
            `;
        }

        return dietPlan;
    };

    const generatePdf = async () => {
        const dietPlan = generateDietPlan();  // Get the diet plan

        // HTML content for the PDF
        const htmlContent = `
            <html>
                <body>
                    <h1>BMI Report</h1>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Gender:</strong> ${gender}</p>
                    <p><strong>Height:</strong> ${height} cm</p>
                    <p><strong>Weight:</strong> ${weight} kg</p>
                    <p><strong>BMI:</strong> ${bmi} (${category})</p>
                    <p><strong>Description:</strong> ${description}</p>

                    <h2>Diet Plan</h2>
                    <table border="1" cellpadding="10">
                        <thead>
                            <tr>
                                <th>Meal</th>
                                <th>Diet Plan</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${dietPlan}
                        </tbody>
                    </table>
                </body>
            </html>
        `;

        try {
            const { uri } = await Print.printToFileAsync({ html: htmlContent });
            console.log('PDF file created at:', uri);

            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri);
            } else {
                alert('Sharing is not available on this device');
            }
        } catch (error) {
            console.error('Error generating or sharing PDF:', error);
            alert('Failed to generate or share the PDF');
        }
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

            {/* Modal */}
            <ModalComponent 
                visible={modalVisible} 
                name={name}
                gender={gender}
                height={height}
                weight={weight}
                bmi={bmi}
                category={category}
                description={description} 
                onClose={() => setModalVisible(false)} 
            />

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
        padding: 10,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#0d47a1',
        padding: 16,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default BmiCalculator;
