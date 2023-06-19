import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, KeyboardAvoidingView, Platform  } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";
import { Alert } from "react-native";

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate("Chat", {
          userID: result.user.uid,
          name: name ? name : "User",
          color: color ? color : "white",
        });
        Alert.alert("Signed in successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try again later.");
      });
  };

  return (
    <ImageBackground
      source={require("../assets/BackgroundImage.png")}
      resizeMode='cover'
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Text style={styles.title}>Chat App</Text>
        </View>
        <View style={styles.subContainer}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Your Name'
          />
          <Text>Choose Background Color</Text>
          <View style={styles.radioButtonContainer}>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#efc7c2" }]}
              onPress={() => setColor("#efc7c2")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#ffe5d4" }]}
              onPress={() => setColor("#ffe5d4")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#bfd3c1" }]}
              onPress={() => setColor("#bfd3c1")}
            ></TouchableOpacity>
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#68a691" }]}
              onPress={() => setColor("#68a691")}
            ></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={signInUser}>
            <Text>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Fixing the iOS Keyboard */}
      {Platform.OS === "ios" ? (<KeyboardAvoidingView behavior='padding' />) : null}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "88%",
  },
  title: {
    fontWeight: "600",
    fontSize: 45,
    color: "#FFFFFF",
  },
  textInput: {
    backgroundColor: '#ffffff',
    height: 40,
    width: "88%",
    margin: 12,
    borderWidth: 3,
    padding: 10,
  },
  radioButtonContainer: {
    width: "70%",
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 20,
  },
  radioButton: {
    backgroundColor: "black",
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#757083",
    padding: 10,
  },
});

export default Start;