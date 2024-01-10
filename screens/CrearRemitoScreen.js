import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
export const CrearRemitoScreen = () => {
    const navigation = useNavigation(); 
    const [remito, setRemito] = useState({
        destino: '',
        entregadoPor: '',
        recibidoPor: '',
        items: [{ nombre: '', cantidad: '' }]
    });

    const agregarItem = () => {
        setRemito({
            ...remito,
            items: [...remito.items, { nombre: '', cantidad: '' }]
        });
    };

    const handleItemChange = (text, index, campo) => {
        const nuevosItems = remito.items.map((item, i) => {
            if (i === index) {
                return { ...item, [campo]: text };
            }
            return item;
        });

        setRemito({ ...remito, items: nuevosItems });
    };

    const crearRemito = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
    
            // Convertir los items a un objeto articulos
            const articulos = remito.items.reduce((acc, item) => {
                if (item.nombre && item.cantidad) {
                    acc[item.nombre] = item.cantidad;
                }
                return acc;
            }, {});
    
            // Crear el objeto de remito completo
            const remitoCompleto = {
                articulos,
                entregadoPor: remito.entregadoPor,
                recibidoPor: remito.recibidoPor,
                fechaEntrega: new Date().toISOString(), // O la fecha que corresponda
            };
    
            await axios.post('http://192.168.0.112:3000/remitos', remitoCompleto, {
                headers: { Authorization: `Bearer ${token}` },
            });
            navigation.navigate('Remitos');
        } catch (error) {
            console.error('Error al crear el remito:', error);
        }
    };
    

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <Text>Destino:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setRemito({ ...remito, destino: text })}
                    value={remito.destino}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Entregado Por:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setRemito({ ...remito, entregadoPor: text })}
                    value={remito.entregadoPor}
                />
            </View>
            <View style={styles.inputGroup}>
                <Text>Recibido Por:</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setRemito({ ...remito, recibidoPor: text })}
                    value={remito.recibidoPor}
                />
            </View>

            {remito.items.map((item, index) => (
                <View key={index} style={styles.itemContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleItemChange(text, index, 'nombre')}
                        value={item.nombre}
                        placeholder="Nombre del ítem"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => handleItemChange(text, index, 'cantidad')}
                        value={item.cantidad}
                        placeholder="Cantidad"
                        keyboardType="numeric"
                    />
                </View>
            ))}

            <TouchableOpacity style={styles.boton} onPress={agregarItem}>
                <Text style={styles.botonTexto}>Agregar Ítem</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.boton} onPress={crearRemito}>
                <Text style={styles.botonTexto}>Crear Remito</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    inputGroup: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        paddingHorizontal: 10,
        height: 40,
        borderRadius: 5,
    },
    itemContainer: {
        marginBottom: 10,
    },
    boton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    botonTexto: {
        color: 'white',
        fontWeight: 'bold',
    }
});


