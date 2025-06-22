import React, { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddClient({ navigation }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const saveClient = async () => {
    if (!name || !location || !price || !date) {
      Alert.alert('Грешка', 'Моля, попълнете всички полета.');
      return;
    }

    const newClient = {
      id: Date.now().toString(),
      name,
      location,
      datetime: date.toISOString(), // 🟢 правилният ключ
      price,
      note,
      isDone: false,
    };

    try {
      const existing = await AsyncStorage.getItem('clients');
      const updated = existing ? [...JSON.parse(existing), newClient] : [newClient];
      await AsyncStorage.setItem('clients', JSON.stringify(updated));
      Alert.alert('Успешно', 'Клиентът е добавен.');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Грешка', 'Записът не беше успешен.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Име" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Местоположение" value={location} onChangeText={setLocation} />
      
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text>{date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          is24Hour={true}
          display="default"
          onChange={onChange}
          minimumDate={new Date()}
        />
      )}

      <TextInput style={styles.input} placeholder="Цена" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <TextInput style={[styles.input, { height: 80 }]} placeholder="Бележка (по избор)" value={note} onChangeText={setNote} multiline />

      <TouchableOpacity style={styles.saveButton} onPress={saveClient}>
        <Text style={styles.saveButtonText}>Запази</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  input: {
    backgroundColor: '#fff',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
