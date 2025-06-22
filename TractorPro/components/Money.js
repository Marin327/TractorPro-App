import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';

const prices = [
  { service: 'Оране до 5 ара', price: '30 лв' },
  { service: 'Оране до 10 ара', price: '45 лв' },
  { service: 'Оране до 1 декар', price: '50 лв' },
  { service: 'Оране до 2 декара', price: '90 лв' },
  { service: 'Браздене до 1 декар', price: '55 лв' },
  { service: 'Браздене до 2 декара', price: '100 лв' },
  { service: 'Фрезоване до 1 декар', price: '65 лв' },
  { service: 'Фрезоване до 2 декара', price: '120 лв' },
  { service: 'Култивиране до 1 декар', price: '60 лв' },
  { service: 'Култивиране до 2 декара', price: '110 лв' },
  { service: 'Пръскане с препарати (1 дка)', price: '30 лв' },
  { service: 'Ръчно косене до 1 декар', price: '70 лв' },
  { service: 'Почистване на двор (до 1 дка)', price: '90 лв' },
  { service: 'Засаждане на разсад (1 дка)', price: '80 лв' },
  { service: 'Събиране на реколта (1 дка)', price: '100 лв' },
  { service: 'Напояване до 1 декар', price: '40 лв' },
  { service: 'Захранване с торове (1 дка)', price: '35 лв' },
  { service: 'Пренасяне на дърва (до 1т)', price: '50 лв' },
  { service: 'Извозване на боклук (1 ремарке)', price: '60 лв' },
  { service: 'Обща земеделска услуга', price: 'По договаряне' },
];

export default function Money() {
  return (
    <ScrollView style={styles.container}>
      {prices.map((item, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.service}>{item.service}</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f9ff',
    padding: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  service: {
    fontSize: 16,
    color: '#003366',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#004080',
  },
});
