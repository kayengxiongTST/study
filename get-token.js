import * as Notifications from 'expo-notifications';


async function registerForPushNotificationsAsync() {
        try {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Notification permission not granted');
                return;
            }
            const token = (await Notifications.getExpoPushTokenAsync({ projectId: PROJECT_ID })).data;


            setPushToken(token)
        } catch (error) {

        }
    }

    useEffect(() => {
        getUsername()
        registerForPushNotificationsAsync();
    }, [])

