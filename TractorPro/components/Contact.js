import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  ScrollView,
  Modal,
  TextInput,
  Platform,
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function Contact() {
  const contactInfo = {
    name: 'Марин Маринов',
    phone: '0897 082 919',
    email: 'marin_9308@abv.bg',
    address: 'Село Сатовча, ул. Александър Стамболийски 7',
    instagram: 'https://www.instagram.com/marinovmarinn/',
    facebook: 'https://www.facebook.com/marin.marinov.948/',
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const openEmailClient = () => {
    if (emailSubject.trim() === '' && emailBody.trim() === '') {
      Alert.alert('Внимание', 'Моля, въведете тема или съобщение.');
      return;
    }

    const subject = encodeURIComponent(emailSubject);
    const body = encodeURIComponent(emailBody);

    const mailto = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;

    Linking.canOpenURL(mailto)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Грешка', 'Не може да се отвори имейл клиента.');
        } else {
          return Linking.openURL(mailto);
        }
      })
      .catch(() => Alert.alert('Грешка', 'Възникна проблем при опит за изпращане на имейл.'));

    setModalVisible(false);
    setEmailSubject('');
    setEmailBody('');
  };

  const openLink = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Грешка', 'Не може да се отвори този линк.');
        } else {
          return Linking.openURL(url);
        }
      })
      .catch(() => Alert.alert('Грешка', 'Възникна проблем при отваряне на линка.'));
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Контактна информация</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <MaterialIcons name="person" size={24} color="#1565c0" />
            <Text style={styles.text}>{contactInfo.name}</Text>
          </View>

          <View style={styles.row}>
            <MaterialIcons name="phone" size={24} color="#1565c0" />
            <Text
              style={styles.text}
              onPress={() => Linking.openURL(`tel:${contactInfo.phone.replace(/\s/g, '')}`)}
            >
              {contactInfo.phone}
            </Text>
          </View>

          <View style={styles.row}>
            <MaterialIcons name="email" size={24} color="#1565c0" />
            <Text style={styles.text}>{contactInfo.email}</Text>
          </View>

          <View style={styles.row}>
            <MaterialIcons name="location-on" size={24} color="#1565c0" />
            <Text style={styles.text}>{contactInfo.address}</Text>
          </View>

          <TouchableOpacity style={styles.emailButton} onPress={() => setModalVisible(true)}>
            <Text style={styles.emailButtonText}>Изпрати имейл</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.header, { marginTop: 30 }]}>Последвай ме в социалните мрежи</Text>

        <View style={styles.socialRow}>
          <TouchableOpacity onPress={() => openLink(contactInfo.instagram)} style={styles.socialButton}>
            <FontAwesome name="instagram" size={30} color="#c13584" />
            <Text style={styles.socialText}>Instagram</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => openLink(contactInfo.facebook)} style={styles.socialButton}>
            <FontAwesome name="facebook-square" size={30} color="#3b5998" />
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Модален прозорец за писане на имейл */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Ново съобщение</Text>

            <TextInput
              style={styles.input}
              placeholder="Тема"
              value={emailSubject}
              onChangeText={setEmailSubject}
              autoFocus
            />

            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Съобщение"
              value={emailBody}
              onChangeText={setEmailBody}
              multiline
              textAlignVertical="top"
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#1565c0' }]}
                onPress={openEmailClient}
              >
                <Text style={styles.modalButtonText}>Изпрати</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[styles.modalButtonText, { color: '#333' }]}>Откажи</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: '#ffffff',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
    color: '#1565c0', // наситено синьо
  },
  card: {
    backgroundColor: '#e3f2fd', // много светло синьо
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#1565c0',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  text: {
    fontSize: 18,
    marginLeft: 15,
    color: '#0d47a1', // тъмно синьо
  },
  emailButton: {
    marginTop: 20,
    backgroundColor: '#1565c0',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  emailButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  socialText: {
    fontSize: 18,
    marginLeft: 8,
    color: '#1565c0',
    fontWeight: '600',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#1565c0',
  },
  input: {
    borderWidth: 1,
    borderColor: '#1565c0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 15 : 10,
    marginBottom: 15,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});
