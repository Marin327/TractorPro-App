import React, { useState } from 'react';
import {
  View,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform
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
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const saveClient = async () => {
    if (!name || !location || !price || !date) {
      Alert.alert('Грешка', 'Моля, попълнете всички полета.');
      return;
    }

    const id = Date.now().toString();
    const newClient = {
      id,
      name,
      location,
      date: date.toISOString(), 
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
      <TextInput
        style={styles.input}
        placeholder="Име"
        placeholderTextColor="#5a7db8"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Местоположение"
        placeholderTextColor="#5a7db8"
        value={location}
        onChangeText={setLocation}
      />

      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{ color: '#123466' }}>
          {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
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

      <TextInput
        style={styles.input}
        placeholder="Цена"
        placeholderTextColor="#5a7db8"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Бележка (по избор)"
        placeholderTextColor="#5a7db8"
        value={note}
        onChangeText={setNote}
        multiline
        textAlignVertical="top"
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveClient} activeOpacity={0.8}>
        <Text style={styles.saveButtonText}>Запази</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f5ff',
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 15 : 10,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#4a90e2',
    color: '#123466',
  },
  saveButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
});
