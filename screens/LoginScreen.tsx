import {Pressable, Text, View, ImageBackground} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";


export default function LoginScreen() {
  const navigation = useNavigation();

  return (
      <ImageBackground
      className={"flex-1 blur-md"}
      source={{uri: "https://images.unsplash.com/photo-1598940603846-a1edd0ef2574?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"}}>
    <SafeAreaView className={"flex-1 bg-gradient-to-r from-blue-500"}>

      <View className={"items-center mt-12"}>
        <Text className={"text-4xl text-white"}>
          Grocery List
        </Text>
      </View>

      <View className={"flex-1 items-center justify-end mb-24"}>
        <Pressable
            className={"bg-white p-3 rounded-full m-2 w-4/5"}
            onPress={() => {
              // @ts-ignore
              navigation.navigate("SignUp")
            }}>
          <Text className={"text-green-600 text-center text-xl"}>
            Create Account
          </Text>
        </Pressable>

        <Pressable
            className={"border-white border-2 p-3 rounded-full m-2 w-4/5"}
            onPress={() => {
              // @ts-ignore
              navigation.navigate("SignIn")
            }}>
          <Text className={"text-white text-center text-xl"}>
            Sign In
          </Text>
        </Pressable>

        <Pressable
            className={"border-white border-2 p-3 rounded-full m-2 w-4/5"}
            onPress={() => {
              // @ts-ignore
              navigation.navigate("Home")
            }}>
          <Text className={"text-white text-center text-xl"}>
            To Home (testing)
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  </ImageBackground>);
}
