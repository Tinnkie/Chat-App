import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, orderBy, } from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
    const { name, color, userID } = route.params;
    //create message state for GiftedChat
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        navigation.setOptions({ title: name });
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
        const unsubMessages = onSnapshot(q, (docs) => {
          let newMessages = [];
          docs.forEach(doc => {
            newMessages.push({
              id: doc.id,
              ...doc.data(),
              createdAt: new Date(doc.data().createdAt.toMillis())
            })
          })
          setMessages(newMessages);
        })
        return () => {
          if (unsubMessages) unsubMessages();
        }
        }, []);

        const addMessagesItem = async (newMessage) => {
          const newMessageRef = await addDoc(
            collection(db, "messages"),
            newMessage[0]
          );
        };

        const onSend = (newMessages) => {
          addMessagesItem(newMessages);
        };

      const renderBubble = (props) => {
        return <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "#000"
            },
            left: {
              backgroundColor: "#FFF"
            }
          }}
        />
      };

 return (
  <View style={[styles.container, { backgroundColor: color }]}>
  <GiftedChat
      messages={messages}
      //adding a prop for renderBubble
      renderBubble={renderBubble}
      onSend={messages => onSend(messages)}
      user={{
        _id: userID,
      }}
      name={{name: name}}
    />
    {/* Fixing the Android Keyboard */}
    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textingBox: {
    flex: 1,
  },
});

export default Chat;