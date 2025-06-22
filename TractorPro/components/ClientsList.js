import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ClientsList({ navigation }) {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const checkUserRole = async () => {
      const role = await AsyncStorage.getItem('userRole');
      setUserRole(role);
      if (role !== 'admin') {
        Alert.alert('Достъп отказан', 'Само администратор може да вижда списъка с клиенти.');
        navigation.goBack();
      }
    };
    checkUserRole();
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (userRole === 'admin') {
        loadClients();
      }
    });
    return unsubscribe;
  }, [navigation, userRole]);

  const loadClients = async () => {
    try {
      const data = await AsyncStorage.getItem('clients');
      const clients = data ? JSON.parse(data) : [];
      clients.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
      setClients(clients);
    } catch (e) {
      console.error('Грешка при зареждане:', e);
    }
  };

  const deleteClient = (id) => {
    Alert.alert(
      'Изтриване',
      'Сигурни ли сте, че искате да изтриете този клиент?',
      [
        { text: 'Отказ', style: 'cancel' },
        {
          text: 'Изтрий',
          style: 'destructive',
          onPress: async () => {
            try {
              const filtered = clients.filter(client => client.id !== id);
              await AsyncStorage.setItem('clients', JSON.stringify(filtered));
              setClients(filtered);
              setModalVisible(false);
              setSelectedClient(null);
            } catch (e) {
              console.error('Грешка при изтриване:', e);
            }
          }
        }
      ]
    );
  };

  const openDetails = (client) => {
    setSelectedClient(client);
    setModalVisible(true);
  };

  const closeDetails = () => {
    setModalVisible(false);
    setSelectedClient(null);
  };

  const renderItem = ({ item }) => {
    const date = new Date(item.datetime);
    const dateString = isNaN(date.getTime())
      ? 'Невалидна дата'
      : `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    return (
      <TouchableOpacity onPress={() => openDetails(item)} style={styles.item}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.date}>{dateString}</Text>
      </TouchableOpacity>
    );
  };

  if (userRole !== 'admin') {
    // Ако не е админ, не показваме съдържание
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontSize: 18, color: 'red' }}>Нямате достъп до този екран.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title="➕ Добави клиент"
        onPress={() => navigation.navigate('AddClient')}
      />

      {clients.length === 0 ? (
        <Text style={styles.emptyText}>Няма запазени клиенти</Text>
      ) : (
        <FlatList
          data={clients}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={{ marginTop: 10 }}
        />
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeDetails}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedClient && (
              <>
                <Text style={styles.modalTitle}>Детайли за клиента</Text>
                <Text style={styles.modalText}><Text style={{ fontWeight: 'bold' }}>Име:</Text> {selectedClient.name}</Text>
                <Text style={styles.modalText}>
                  <Text style={{ fontWeight: 'bold' }}>Дата и час:</Text>{' '}
                  {new Date(selectedClient.datetime).toLocaleString()}
                </Text>
                <Text style={styles.modalText}><Text style={{ fontWeight: 'bold' }}>Услуга:</Text> {selectedClient.service || 'Не е зададена'}</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 20 }}>
                  <Button title="Затвори" onPress={closeDetails} />
                  <Button
                    title="Изтрий"
                    color="red"
                    onPress={() => deleteClient(selectedClient.id)}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: { padding: 15, borderBottomWidth: 1, borderColor: '#ccc' },
  name: { fontSize: 18, fontWeight: '600' },
  date: { fontSize: 14, color: 'gray' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: 'gray' },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
    width: '80%',
    alignItems: 'flex-start',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
