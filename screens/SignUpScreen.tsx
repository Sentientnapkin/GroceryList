import {ImageBackground, Pressable, Text, TextInput, View} from 'react-native';
import {useEffect, useState} from "react";
import {KeyIcon, EnvelopeIcon, UserIcon} from "react-native-heroicons/outline";
import {ArrowLeftIcon} from "react-native-heroicons/mini";
import {useNavigation} from "@react-navigation/native";
import {Magic} from "@magic-sdk/react-native";

const magic = new Magic('pk_live_F74F88465784B958'); // ✨
export default function SignUpScreen() {
  const isLoggedIn = magic.user.isLoggedIn();
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  // useEffect(() => {
  //   // @ts-ignore
  //   if(isLoggedIn) {
  //     // @ts-ignore
  //     navigation.navigate("Home");
  //   }
  // });


  return (
      <ImageBackground
          className={"flex-1 blur-md"}
          source={{uri: "https://images.unsplash.com/photo-1598940603846-a1edd0ef2574?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"}}>
        <View className={"flex-1 justify-center items-center basis-5/6 rounded-lg pt-12"}>
          <Pressable className={"absolute top-12 left-0 p-4"} onPress={() => {navigation.goBack()}}>
            <ArrowLeftIcon
              color={"white"}
              size={40}
            />
          </Pressable>
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

          {/**
          <View className={"flex-row items-center justify-between space-x-4 bg-gray-200 rounded-full p-4 w-4/5 mb-4"}>
            <TextInput
                className={""}
                onChangeText={setUsername}
                value={username}
                placeholder="Username"
                style={{textAlign: "center", fontSize: 18}}
            />

            <UserIcon
                size={32}
                color={"black"}
                className={""}
            />
          </View>

          <View className={"flex-row items-center justify-between space-x-4 bg-gray-200 rounded-full p-4 w-4/5 mb-6"}>
            <TextInput
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

          <View className={"flex-row items-center justify-between space-x-4 bg-gray-200 rounded-full p-4 w-4/5 mb-6"}>
            <TextInput
                className={""}
                onChangeText={setConfirmPassword}
                value={confirmPassword}
                placeholder="Confirm password"
                style={{textAlign: "center", fontSize: 18}}
            />

            <KeyIcon
                size={32}
                color={"black"}
                className={""}
            />
          </View>
           **/}

          <Pressable className={"bg-green-600 p-4 rounded-full w-4/5 mb-4"} onPress={() => {magic.auth.loginWithEmailOTP({ email }).catch();}}>
            <Text className={"text-white text-center text-xl"}>
              Create Account
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
  );
}
