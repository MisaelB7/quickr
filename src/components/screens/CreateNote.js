import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Caption, IconButton, TextInput } from "react-native-paper";
import { format } from "date-fns";
import theme from "../../theme";
import { Picker } from "@react-native-picker/picker";
import { Context as NoteContext } from "../../providers/NoteContext";
import { Context as AuthContext } from "../../providers/AuthContext";

const CreateNote = ({ navigation }) => {
  const { state: notesState,createNote} = useContext(NoteContext);
  const { state } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [timestamp, setTimestamp] = useState(Date.now());
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleSaveNote = () => {
    if (!title) {
      setTitle("New note");
      createNote("New note", content, timestamp, category, state.user.id);
    } else createNote(title, content, timestamp, category, state.user.id);

    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconBar}>
        <IconButton
          icon="close-circle-outline"
          color={theme.colors.primary}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <IconButton
          icon="check-circle-outline"
          color={theme.colors.primary}
          onPress={handleSaveNote}
        />
      </View>
      <TextInput
        mode="flat"
        placeholder="Title"
        style={styles.titleInput}
        value={title}
        onChangeText={setTitle}
      />
      <Caption>{`${format(timestamp, "eee H:m")}, | ${
        content.length
      } characters`}</Caption>
      
      <View style={styles.direction}>
      <Caption>Category</Caption>
      <Picker
        style={styles.picker}
        onValueChange={(itemValue) => {
          setCategory(itemValue);
        }}
      >
        {notesState.categories.map((category, index) => (
          <Picker.Item
            key={index}
            label={category}
            value={category}
          />
        ))}
      </Picker>
      </View>

      <TextInput
        multiline
        style={styles.contentInput}
        textAlignVertical="top"
        value={content}
        onChangeText={setContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: theme.colors.backgroundWhite,
  },
  titleInput: {
    fontSize: 22,
    fontWeight: "bold",
    backgroundColor: theme.colors.backgroundWhite,
  },
  contentInput: {
    flex: 1,
    backgroundColor: theme.colors.backgroundWhite,
    borderBottomWidth: 0,
  },
  iconBar: {
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  picker: {
    fontSize: 12,
    width: 300,
    marginBottom: 5,
    marginTop: 5,
    alignSelf: "center",
    paddingVertical: 10,
  },
  direction:{
    flexDirection:"row",
    justifyContent:"center",
  }
});

export default CreateNote;
