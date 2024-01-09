import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export const CrearRemitoScreen = () => {
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

    const crearRemito = () => {
        // Aquí lógica para crear el remito con los datos actuales
        console.log(remito);
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


