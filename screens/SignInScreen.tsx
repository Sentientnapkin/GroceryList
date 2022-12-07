import {Pressable, TextInput, View, Text, ImageBackground, Image} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {useState} from "react";
import {KeyIcon, EnvelopeIcon} from "react-native-heroicons/outline";
import {useNavigation} from "@react-navigation/native";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigation();

  return (
      <ImageBackground
          className={"flex-1 blur-md"}
          source={{uri: "https://images.unsplash.com/photo-1598940603846-a1edd0ef2574?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"}}>
        <View className={"flex-1"}>
          <SafeAreaView className={"items-center mt-12 basis-1/6"}>

          </SafeAreaView>

          <View className={"flex-1 justify-start items-center bg-white basis-5/6 rounded-lg pt-12"}>
            <View className={"flex-row items-center justify-between space-x-4 bg-gray-200 rounded-full p-4 w-4/5 mb-4"}>
              <TextInput
                  className={""}
                  onChangeText={setEmail}
                  value={email}
                  placeholder="Email"
                  keyboardType={"email-address"}
                  style={{textAlign: "center", fontSize: 18}}
              />

              <EnvelopeIcon
                  size={32}
                  color={"black"}
                  className={""}
              />
            </View>

            <View className={"flex-row items-center justify-between space-x-4 bg-gray-200 rounded-full p-4 w-4/5 mb-6"}>
              <TextInput
                  secureTextEntry={true}
                  className={""}
                  onChangeText={setPassword}
                  value={password}
                  placeholder="Password"
                  style={{textAlign: "center", fontSize: 18}}
              />

              <KeyIcon
                  size={32}
                  color={"black"}
                  className={""}
              />
            </View>

            <Pressable className={"bg-green-600 p-4 rounded-full w-4/5 mb-4"}>
              <Text className={"text-white text-center text-xl"}>
                Login
              </Text>
            </Pressable>

            <Pressable className={"mb-24"}>
              <Text className={"text-green-600 text-center text-md"}>
               Forgot Password?
              </Text>
            </Pressable>

            <Pressable className={"flex-row items-center border-gray-300 border-0.5 rounded-md p-2 space-x-2 mb-4"}>
              <Image
                style={{width: 20, height: 20}}
                source={{uri: "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"}}
              />
              <Text>
                Sign in
              </Text>
            </Pressable>

            <View className={"flex-row mb-8"}>
              <Text className={"text-center text-md"}>
                Don't have an account? {" "}
              </Text>
              <Pressable className={""} onPress={() =>  {
                // @ts-ignore
                navigation.navigate("SignUp")
              }}>
                <Text className={"text-green-600 text-center text-md"}>
                  Sign Up
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ImageBackground>
  );
}
