import Start from './components/Start.js';
import Chat from './components/Chat.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { useNetInfo }from '@react-native-community/netinfo';

const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyDCpKRYJYCltLHebApzFLyQ4Gv6OhlO3KE",
  authDomain: "chat-demo-7e3d6.firebaseapp.com",
  projectId: "chat-demo-7e3d6",
  storageBucket: "chat-demo-7e3d6.appspot.com",
  messagingSenderId: "942022584780",
  appId: "1:942022584780:web:0cde3bb8d2eea371d91569"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default function App() {
  const connectionStatus = useNetInfo();
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
    <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen name='Chat'>
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              {...props}
            />
          )}
          </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

