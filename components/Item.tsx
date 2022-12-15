import {Pressable, Text, View} from 'react-native';
import {XMarkIcon} from "react-native-heroicons/mini";

export default function Item({ itemName, setItemToDelete } : { itemName: string, setItemToDelete: (item: string) => void}) {
  return (
    <View className={"flex-row m-2 p-2 rounded-full bg-gray-200 items-center"}>
      <View>
        <Text className={"text-2xl pl-4"}>
          {itemName}
        </Text>
      </View>
      <Pressable className={"ml-auto bg-red-600 rounded-full items-center justify-center h-12 w-12"}
                 onPress={() => {setItemToDelete(itemName)}}>
        <XMarkIcon
          color={"black"}
          size={32}
        />
      </Pressable>
    </View>
  );
}
