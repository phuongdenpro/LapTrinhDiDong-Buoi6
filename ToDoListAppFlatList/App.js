import React, { useState } from "react";
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
} from "react-native";
import Task from "./components/Task";
import styles from "./App.components.style";
import Form from "./components/Form";

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const handleAddTask = (task) => {
    setTaskList([...taskList, task]);
  };
  const handleDeleteTask = (index) => {
    Alert.alert("Thông báo !", "Bạn có chắc chắn muốn xóa?", [
      {
        text: "OK",
        onPress: () => {
          let taskListTmp = [...taskList];
          taskListTmp.splice(index, 1);
          setTaskList(taskListTmp);
        },
      },
      { text: "Cancel", onPress: () => {} },
    ]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.header}>Todo List</Text>
        <FlatList
          data={taskList}
          renderItem={({ item }) => (
            <Task
              key={taskList.indexOf(item)}
              title={item}
              number={taskList.indexOf(item)+1}
              onDeleteTask={() => handleDeleteTask(taskList.indexOf(item))}
            />
          )}
        />
      </View>
      <Form onAddTask={handleAddTask} />

      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default App;
