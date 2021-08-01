import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";
import * as firebase from "firebase";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle function logic
  const onSignUp = () => {
    console.log("onSignUp function exctuted");
    console.log(email, password);

    firebase.default
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebase.default.firestore().collection("users")
          .doc(firebase.default.auth().currentUser.uid)
          .set({
            name,
            email
          })
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TextInput placeholder="name" onChangeText={(name) => setName(name)} />
      <TextInput
        placeholder="email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button title="Sign Up" onPress={() => onSignUp()} />
    </View>
  );
}
