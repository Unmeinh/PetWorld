import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid} from 'react-native';
import notifee, {AndroidImportance, EventType} from '@notifee/react-native';

async function requestUserPermissionIos() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
const requestUserPermissionAndroid = () => {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
};

async function onDisplayNotification(data) {
  // Request permissions (required for iOS)
  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title: data?.notification?.title,
    body: data?.notification?.body,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      color: '#F582AE',
      smallIcon: 'ic_notification', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

const notificationListenner = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
  messaging().onMessage(async remoteMessage => {
    await onDisplayNotification(remoteMessage);
  });
};

const backGroundHandle = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
};

const notifeeBackGroundEvent = () => {
  notifee.onBackgroundEvent(async ({type, detail}) => {
    const {notification, pressAction} = detail;
    console.log('notifyBackgroundEnvent' + detail);

    // Check if the user pressed the "Mark as read" action
    if (type === EventType.ACTION_PRESS && pressAction?.id === 'mark-as-read') {
      // Update external API
      // await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
      //   method: 'POST',
      // });

      // Remove the notification
      await notifee.cancelNotification(notification?.id + '');
    }
  });
};
const pushNotification = {
  requestUserPermissionAndroid,
  requestUserPermissionIos,
  notificationListenner,
  backGroundHandle,
  notifeeBackGroundEvent,
};
export default pushNotification;
