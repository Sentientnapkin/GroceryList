import {Pressable, Text, View} from 'react-native';
import {MinusIcon, XMarkIcon} from "react-native-heroicons/mini";

export default function ListItem({ listName, onPress }: { listName: string, onPress: () => void }) {

  return (
    <View className={"flex-row m-2 p-2 rounded-full bg-gray-200 items-center"}>
      <Text className={"text-2xl pl-4"}>
        {listName}
      </Text>
      <Pressable className={"ml-auto bg-red-600 rounded-full items-center justify-center h-12 w-12"}
                 onPress={() => alert("You clicked on " + listName)}>
        <XMarkIcon
          color={"black"}
          size={32}
        />
      </Pressable>
    </View>
  );
}
