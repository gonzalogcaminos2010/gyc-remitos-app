import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Importa useNavigation

import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation(); // Ahora useNavigation debería funcionar correctamente

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.0.112:3000/auth/login', {
                email: username,
                password: password,
            });
            const { access_token } = response.data;
            await AsyncStorage.setItem('userToken', access_token);

            console.log('Login exitoso:', access_token);
            navigation.navigate('Remitos'); // Asegúrate de que 'Remitos' es el nombre de tu pantalla de remitos
        } catch (error) {
            console.error('Error en el login:', error.response ? error.response.data : error.message);
        }
    };



    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/logo.png')} 
                style={styles.logo} 
                resizeMode="contain"
            />
            <TextInput
                style={styles.input}
                placeholder="Usuario"
                onChangeText={setUsername}
                value={username}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 300,
        height: 165,
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
    },
});

export default LoginScreen;
