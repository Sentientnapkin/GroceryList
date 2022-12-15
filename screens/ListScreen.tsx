import {FlatList, ImageBackground, Pressable, Text, TextInput, View} from 'react-native';
import {ArrowLeftIcon, Bars3Icon, PlusIcon, XMarkIcon} from "react-native-heroicons/mini";
import {useNavigation} from "@react-navigation/native";
import {SafeAreaView} from "react-native-safe-area-context";
import {useEffect, useState} from "react";
import sanityClient from "../lib/sanity/client";
import client from "../lib/sanity/client";
import Modal from "react-native-modal";
import Item from "../components/Item";
import Trie from "../lib/Trie";

const trie = new Trie();
export default function ListScreen({route}: { route: any }) {
  const { listName, listItems, listId } = route.params;
  const [menuVisible, setMenuVisible] = useState(false);
  const [addItemMenuVisible, setAddItemMenuVisible] = useState(false);
  const [items, setItems] = useState(listItems);
  let [newItemName, setNewItemName] = useState("");
  const [error, setError] = useState("");
  const [itemToDelete, setItemToDelete] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const navigation = useNavigation();
  const { v4: uuid } = require('uuid');

  const findWordsWithPrefix = (): void => {
    trie.autoComplete(newItemName);
    setSuggestions(trie.autoCompleteArray);
  };

  const changeItemToDelete = (item: string) => {
    setItemToDelete(item);
    // @ts-ignore
    handleDelete()
      .then(() => {
        console.log("deleted");
      })
      .catch(console.error);
  }

  useEffect(() => {
    sanityClient.fetch(`
    *[_type == "list" && _id == "${listId}"] {
      ...,
    }`).then((data) => {
      setItems(data[0].items);
    }).catch(console.error);
  });

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    setAddItemMenuVisible(false);
    //if either part of the form isn't filled out
    //set an error message and exit
    if (newItemName.length == 0) {
      setError("Item name must be filled out.");
    }
    else if (items.includes(newItemName)){
      setError("Item already exists.");
    } else {
      await client
        .patch(listId)
        .setIfMissing({items: []})
        // Add the items after the last item in the array (append)
        .insert('after', 'items[-1]', [newItemName])
        .commit()
        .then((res) => {
          console.log(res);
        }).catch(console.error);
    }
    trie.add(newItemName);
    setNewItemName("");
  }

  const handleDelete = async (e: { preventDefault: () => void; }) => {
    await client
      .patch(listId)
      .setIfMissing({items: []})
      .set({items: items.filter((item: string)=> item !== itemToDelete)})
      .commit()
      .then((res) => {
        console.log(res);
      }).catch(console.error);
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

      <Modal isVisible={addItemMenuVisible}
             style={{ margin: 0 }}
             backdropOpacity={0.0}
             avoidKeyboard={true}
             animationIn="slideInUp"
             animationOut="slideOutDown">
        <View className={"flex-1"}>
          <View className={"flex-1"}>
            <Pressable className={"basis-1/6"} onPress={() => setAddItemMenuVisible(false)}/>
            <View className={"bg-white basis-5/6 items-center"}>
              <Text className={"text-4xl mt-8"}>
                Add Item
              </Text>
              <View className={"p-3 bg-gray-200 w-4/5 rounded-lg mt-4"}>
                <TextInput
                  className={""}
                  onChangeText={setNewItemName}
                  onChange={findWordsWithPrefix}
                  value={newItemName}
                  placeholder="List name"
                  style={{textAlign: "center", fontSize: 18}}
                />
              </View>
              <View className={"h-1/4 w-4/5"}>
                <FlatList
                  className={""}
                  data={suggestions}
                  renderItem={({item}) => (
                    <View className={"flex-1"}>
                      <View className={"flex-1 justify-left bg-gray-100 border-t-0.5 p-3"}>
                        <Pressable
                          className={""}
                          onPress={() => {
                            setNewItemName(item);
                            newItemName=item;
                            // @ts-ignore
                            handleSubmit().then(() => {
                              console.log("autocompleted");
                            }).catch(console.error);
                          }}>
                          <Text className={"text-xl"}>
                            {item}
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  )}/>
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
                  setAddItemMenuVisible(false);
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
        <SafeAreaView className={"absolute top-0 left-0"}>
        </SafeAreaView>
        <SafeAreaView className={"flex-1"}>
          <View className={"flex-row justify-between items-center"}>
            <View className={"border-b-2 ml-12"}>
              <Text className={"text-black text-4xl"}>
                {listName}
              </Text>
            </View>
            <Pressable
              onPress={() => setAddItemMenuVisible(true)}
              className={"bg-green-600 p-3 mr-16 h-12 w-12 rounded-full items-center justify-center"}>
              <PlusIcon color={"white"}/>
            </Pressable>
          </View>
          <View className={"flex-1"}>
            <FlatList
              data={items}
              renderItem={({item}) => {
                return (
                  <Item itemName={item} setItemToDelete={changeItemToDelete}/>)}}/>
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
          <SafeAreaView className={"absolute top-0 left-0 flex-1"}>
            <Pressable
              className={"p-3 items-center justify-center"}
              onPress={() => {
                navigation.goBack();
              }}>
              <ArrowLeftIcon color={"black"} size={32}/>
            </Pressable>
          </SafeAreaView>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
}
