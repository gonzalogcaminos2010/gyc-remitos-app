import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RemitosScreen = ({ navigation }) => {
  const [remitos, setRemitos] = useState([]);

  useEffect(() => {
    const fetchRemitos = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.get('http://192.168.0.112:3000/remitos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRemitos(response.data);
      } catch (error) {
        console.error('Error al obtener los remitos:', error);
      }
    };

    fetchRemitos();
  }, []);

  const getFormattedDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const renderItem = ({ item }) => (
    <View style={styles.remitoContainer}>
      <Text style={styles.title}>{`Remito Nº ${item.id} - ${item.origen} / ${item.destino} - ${getFormattedDate(item.fechaEntrega)}`}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('DetalleRemito', { remitoId: item.id })}
      >
        <Text style={styles.buttonText}>Ver Detalle</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={remitos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  remitoContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});


