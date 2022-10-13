import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import Task from "./components/Task";
import styles from "./App.components.style";
import Form from "./components/Form";

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const handleAddTask = (task) => {
    fetch("https://634812e00484786c6e91130b.mockapi.io/api/todos", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: task }),
    });
  };

  const getListTodos = () => {
    const apiUrl = "https://634812e00484786c6e91130b.mockapi.io/api/todos";
    fetch(apiUrl)
      .then((res) => res.json())
      .then((resJson) => {
        setTaskList(resJson);
      })
      .catch((error) => {
        console.log("Error: ", error);
      })
      .finally(() => setisLoading(false));
  };
  useEffect(() => {
    getListTodos();
    return () => {};
  }, []);

  const handleDeleteTask = (index) => {
    Alert.alert("Thông báo !", "Bạn có chắc chắn muốn xóa?", [
      {
        text: "OK",
        onPress: () => {
          fetch(
            "https://634812e00484786c6e91130b.mockapi.io/api/todos/" + index,
            {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          );
        },
      },
      { text: "Cancel", onPress: () => {} },
    ]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>Todo List api Mockapi.io</Text>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={taskList}
            renderItem={({ item }) => (
              <Task
                key={taskList.indexOf(item)}
                title={item.name}
                number={taskList.indexOf(item) + 1}
                onDeleteTask={() => handleDeleteTask(item.id)}
              />
            )}
          />
        )}
      </View>
      <Form onAddTask={handleAddTask} />

      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default App;
