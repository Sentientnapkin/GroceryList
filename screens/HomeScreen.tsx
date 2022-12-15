import {FlatList, ImageBackground, Pressable, Text, TextInput, View} from 'react-native';
import Modal from "react-native-modal";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import {Bars3Icon, PlusIcon, XMarkIcon} from "react-native-heroicons/mini";
import {useNavigation} from "@react-navigation/native";
import ListItem from "../components/ListItem";
import client from "../lib/sanity/client";
import sanityClient from "../lib/sanity/client";

export default function HomeScreen() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [addListMenuVisible, setAddListMenuVisible] = useState(false);
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState("");
  const [error, setError] = useState("");
  const [listIdToDelete, setListIdToDelete] = useState("");
  const navigation = useNavigation();
  const { v4: uuid } = require('uuid');

  const changeListIdToDelete = (id: string) => {
    setListIdToDelete(id);
    // @ts-ignore
    handleDelete()
      .then(() => {
        console.log("deleted");
      })
      .catch(console.error);
  }

  useEffect(() => {
    sanityClient.fetch(`
    *[_type == "list"] {
      ...,
    }`).then((data) => {
      setLists(data);
    }).catch(console.error);
  });

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    setAddListMenuVisible(false);
    e.preventDefault();
    //if either part of the form isn't filled out
    //set an error message and exit
    if (newListName.length == 0) {
      setError("List name must be filled out.");
    } else {
      await client
        .create({
          _type: "list",
          listName: newListName,
          allowedUsers: [],
          items: [],
          _id: uuid
        }).then((res) => {
          console.log(res);
        }).catch(console.error);
    }
    setNewListName("");
  };

  const handleDelete = async (e: { preventDefault: () => void }) => {
    await client
      .delete({query: `*[_type == "list"][_id=="${listIdToDelete}"]`})
      .then((res) => {
        console.log(res);
      })
      .catch(console.error);
  }

  return (
      <>
        <Modal isVisible={menuVisible}
               style={{ margin: 0 }}
               coverScreen={true}
               backdropOpacity={0.0}
               animationIn="slideInRight"
               animationOut="slideOutRight">
            <View className={"flex-1 flex-row"}>
                <Pressable className={"basis-1/4"} onPress={() => setMenuVisible(false)}/>
                <View className={"bg-white basis-3/4 items-center rounded-md"}>
                  <Text className={"text-2xl mt-12"}>
                    Menu
                  </Text>
                  <Pressable
                      className={"p-3"}
                      onPress={() => {

                      }}>
                      <Text>
                          Sign Out
                      </Text>
                  </Pressable>
                  <Pressable
                      className={"p-3"}
                      onPress={() => {
                        setMenuVisible(false);
                      }}>
                    <Text>
                      Close
                    </Text>
                  </Pressable>
              </View>
            </View>
        </Modal>

        <Modal isVisible={addListMenuVisible}
               style={{ margin: 0 }}
               backdropOpacity={0.0}
               avoidKeyboard={true}
               animationIn="slideInUp"
               animationOut="slideOutDown">
          <View className={"flex-1"}>
            <View className={"flex-1"}>
              <Pressable className={"basis-1/6"} onPress={() => setAddListMenuVisible(false)}/>
              <View className={"bg-white basis-5/6 items-center"}>
                <Text className={"text-4xl mt-12"}>
                  Add List
                </Text>
                <View className={"p-3 bg-gray-200 w-4/5 rounded-lg mt-20"}>
                  <TextInput
                    className={""}
                    onChangeText={setNewListName}
                    value={newListName}
                    placeholder="List name"
                    style={{textAlign: "center", fontSize: 18}}
                  />
                </View>
                <Pressable
                  onPress={handleSubmit}
                  className={"rounded-lg py-4 px-6 bg-green-600 mt-12"}>
                  <Text className={"text-white text-lg"}>
                    Add
                  </Text>
                </Pressable>
                <Pressable
                  className={"p-3 absolute top-0 right-0"}
                  onPress={() => {
                    setAddListMenuVisible(false);
                  }}>
                  <XMarkIcon color={"black"} size={42}/>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

        <ImageBackground
            className={"flex-1"}
            source={{uri: "https://"}}>
          <SafeAreaView className={"flex-1 mt-4"}>
            <View className={"flex-row justify-between items-center"}>
              <View className={"border-b-2 ml-4"}>
                <Text className={"text-black text-4xl"}>
                  My Lists
                </Text>
              </View>
              <Pressable
                onPress={() => setAddListMenuVisible(true)}
                className={"bg-green-600 p-3 mr-16 h-12 w-12 rounded-full items-center justify-center"}>
                <PlusIcon color={"white"}/>
              </Pressable>
            </View>
            <View className={"flex-1"}>
              <FlatList
                  data={lists}
                  renderItem={({item: {_id, items, listName}}) => {
                    return (
                      // @ts-ignore
                      <ListItem listName={listName}
                                listId={_id}
                                onPress={
                                  () => {
                                    //@ts-ignore
                                    navigation.navigate("List", {listName: listName, listItems: items, listId: _id})
                                  }
                                }
                                setId={changeListIdToDelete}/>
                    );
                  }}
              />
            </View>

            <SafeAreaView className={"absolute top-0 right-4"}>
              <Pressable
                  className={"p-3"}
                  onPress={() => {
                    setMenuVisible(true);
                  }}>
                <Bars3Icon color={"black"} size={28}/>
              </Pressable>
            </SafeAreaView>
          </SafeAreaView>
        </ImageBackground>
      </>
  );
}
