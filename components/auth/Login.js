import React, { useState } from "react";
import { View, Button, TextInput } from "react-native";
import * as firebase from "firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle function logic
  const onSignUp = () => {
    console.log("onSignUp function exctuted");
    console.log(email, password);

    firebase.default
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <TextInput
        placeholder="email"
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />
      <Button title="Sign In" onPress={() => onSignUp()} />
    </View>
  );
}
