import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Linking,
  ScrollView,
  Modal,
  TextInput,
  Button,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const phoneNumber = '+359897082919';

  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');

  const ADMIN_PASSWORD = '1234'; 

  const handleCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  const checkPassword = () => {
    if (password === ADMIN_PASSWORD) {
      setModalVisible(false);
      setPassword('');
      navigation.navigate('ClientsList');
    } else {
      Alert.alert('Грешна парола', 'Моля, опитайте отново.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Земеделски услуги "Христо"</Text>

      <TouchableWithoutFeedback onPress={() => navigation.navigate('AddClient')}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>➕ Запази час</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>📋 Списък с клиенти</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => navigation.navigate('Money')}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>💰 Ценоразпис</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => navigation.navigate('Contact')}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>📞 Контакти</Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={handleCall}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Animated.View style={[styles.callButton, { transform: [{ scale: scaleAnim }] }]}>
          <MaterialCommunityIcons
            name="tractor"
            size={28}
            color="#fff"
            style={{ marginRight: 12 }}
          />
          <Text style={styles.callButtonText}>Обади се сега</Text>
        </Animated.View>
      </TouchableWithoutFeedback>

      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={{ fontSize: 18, marginBottom: 12 }}>Въведете админ парола</Text>
            <TextInput
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Парола"
              placeholderTextColor="#555"
              autoFocus
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
              <Button title="Откажи" onPress={() => { setModalVisible(false); setPassword(''); }} />
              <Button title="Вход" onPress={checkPassword} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e8f0fe',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1a237e',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#3949ab',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#1a237e',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 7,
    elevation: 5,
  },
  buttonText: {
    color: '#e8f0fe',
    fontSize: 18,
    fontWeight: '600',
  },
  callButton: {
    flexDirection: 'row',
    backgroundColor: '#283593',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 14,
    marginTop: 30,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#1a237e',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 6,
  },
  callButtonText: {
    color: '#e8f0fe',
    fontSize: 20,
    fontWeight: '700',
  },

  modalBackground: {
    flex:1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
  },
  input: {
    borderColor: '#3949ab',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
  },
});
