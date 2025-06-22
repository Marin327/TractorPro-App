import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const scheduleClientNotification = async (name, location, date, price) => {
  try {
    const taskDate = new Date(date);
    if (isNaN(taskDate)) {
      console.warn('Невалидна дата при създаване на известие');
      return;
    }

    const triggerDate = new Date(taskDate);
    triggerDate.setDate(triggerDate.getDate() - 1);
    triggerDate.setHours(9, 0, 0);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Напомняне: ${name}`,
        body: `Утре имаш клиент в ${location} за ${price} лв.`,
      },
      trigger: triggerDate,
    });

    console.log(`Известие планирано за: ${triggerDate.toISOString()}`);
  } catch (err) {
    console.error('Грешка при създаване на известие:', err);
  }
};
