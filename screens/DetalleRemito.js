import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DetalleRemito = ({ route }) => {
  const { remitoId } = route.params;
  const [remito, setRemito] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetalleRemito = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.get(`http://192.168.0.112:3000/remitos/${remitoId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRemito(response.data);
      } catch (error) {
        setError('Error al obtener detalles del remito');
        console.error('Error al obtener detalles del remito:', error);
      }
    };

    fetchDetalleRemito();
  }, [remitoId]);

  if (!remito) {
    return (
      <View style={styles.centered}>
        <Text>Cargando detalles del remito...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.remitoContainer}>
        <Text style={styles.title}>Remito Número: {remito.id}</Text>
        <Text>Entregado Por: {remito.entregadoPor}</Text>
        <Text>Recibido Por: {remito.recibidoPor}</Text>
        <Text>Fecha de Entrega: {new Date(remito.fechaEntrega).toLocaleDateString()}</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Artículos:</Text>
          {Object.entries(remito.articulos).map(([key, value]) => (
            <Text key={key}>{key}: {value}</Text>
          ))}
        </View>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  remitoContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 10,
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


