import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';

//import { login } from '../Services/AuthServices'; // Asegúrate de que la ruta sea correcta

const LoginScreen = ({}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation(); // Agrega esto para usar la navegación
  
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:3000/auth/login', {
                email: username,
                password: password,
            });
            const { access_token } = response.data;

            console.log('Login exitoso:', access_token);
            navigation.navigate('RemitosScreen');  // Asume que 'Remitos' es el nombre de tu otra pantalla
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
