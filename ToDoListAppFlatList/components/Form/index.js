import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import styles from "./style";
import { useState } from "react";

const Form = (props) => {
  const [task, setTask] = useState('');
  const handleAddTask = ()=>{
    if(task.length === 0){
      alert("Bạn vui lòng nhập công việc");
      return;
    }
    props.onAddTask(task);
    setTask('');
    Keyboard.dismiss();
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      KeyboardAvoidingView = {10}
      style={styles.addTask}
    >
      <TextInput style={styles.input} placeholder="Your task"
        onChangeText={(text) =>setTask(text)} value ={task}
      ></TextInput>
      <TouchableOpacity onPress={handleAddTask}>
        <View style={styles.icon}>
          <Text style={styles.textIcon}>+</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
export default Form;
