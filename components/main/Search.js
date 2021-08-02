import React, { useEffect, useState } from "react";
import {
  TextInput,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";
import firebase from "firebase";

require("firebase/firestore");

export default function Search(props) {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const searchUser = () => {
      const result = data.filter(
        (user) =>
          user.name.includes(query.toUpperCase()) ||
          user.name.includes(query.toLowerCase())
      );
      setUsers(result);
    };

    searchUser();
  }, [query]);

  const fetchUsers = (search = "") => {
    firebase
      .firestore()
      .collection("users")
      .where("name", ">=", search)
      .get()
      .then((snapshot) => {
        let users = snapshot.docs.map((doc) => {
          const data = doc.data();
          const id = doc.id;
          return { id, ...data };
        });
        setUsers(users);
        setData(users);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Type Here..."
        onChangeText={(searchQuery) => setQuery(searchQuery)}
      />
      <FlatList
        numColumns={1}
        horizontal={false}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Profile", { uid: item.id })
            }
          >
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
