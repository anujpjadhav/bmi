import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ModalComponent = ({ visible, name, gender, height, weight, bmi, category, description, onClose }) => {
    return (
        <Modal
            transparent={true}
            animationType="slide"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {/* Display user details */}
                    <Text style={styles.modalText}>Name: {name}</Text>
                    <Text style={styles.modalText}>Gender: {gender}</Text>
                    <Text style={styles.modalText}>Height: {height} cm</Text>
                    <Text style={styles.modalText}>Weight: {weight} kg</Text>
                    <Text style={styles.modalText}>BMI: {bmi} ({category})</Text>
                    <Text style={styles.modalText}>{description}</Text>

                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    closeButton: {
        backgroundColor: '#2c6975',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default ModalComponent;
