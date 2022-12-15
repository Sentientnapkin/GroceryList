import {Pressable, Text, View} from 'react-native';
import { XMarkIcon } from "react-native-heroicons/mini";

// @ts-ignore
export default function ListItem({ listName, listId, onPress, setId } : { listName: string, listId: string, onPress: () => void,  setId: (id: string) => void }) {
  return (
    <View className={"flex-row m-2 p-2 rounded-full bg-gray-200 items-center"}>
      <View>
        <Pressable onPress={onPress}>
          <Text className={"text-2xl pl-4"}>
            {listName}
          </Text>
        </Pressable>
      </View>
      <Pressable className={"ml-auto bg-red-600 rounded-full items-center justify-center h-12 w-12"}
                 onPress={() => { setId(listId)}}>
        <XMarkIcon
          color={"black"}
          size={32}
        />
      </Pressable>
    </View>
  );
}
