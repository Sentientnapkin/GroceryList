import {ImageBackground, Pressable, Text, TextInput, View} from 'react-native';
import {SetStateAction, useState} from "react";
import {KeyIcon, EnvelopeIcon, UserIcon} from "react-native-heroicons/outline";
import useAuth from "../hooks/useAuth";

export default function SignUpScreen() {
  const {user, loading} = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    //if either part of the form isn't filled out
    //set an error message and exit
    if (email.length == 0 || password.length == 0 || username.length == 0 || confirmPassword.length == 0) {
      setError("All text should be filled out.");
    } else {
      //otherwise send the todo to our api
      // (we'll make this next!)
      await fetch("/api/user", {
        method: "POST",
        body: JSON.stringify({
          password: password,
          email: email,
          userName: username,
        }),
      }).catch((err) => {
        console.log(err);
        setError("Error signing up.");
      });
      // await fetchTodos(); //(we'll add this later)
      // Clear all inputs after the user is sent to Sanity
      // setEmail("");
      // setError("");
      // setPassword("");
      // setConfirmPassword("");
      // setUsername("");
    }
  }

  return (
      <ImageBackground
          className={"flex-1 blur-md"}
          source={{uri: "https://images.unsplash.com/photo-1598940603846-a1edd0ef2574?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"}}>
        <View className={"flex-1 justify-center items-center basis-5/6 rounded-lg pt-12"}>
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

          <Pressable className={"bg-green-600 p-4 rounded-full w-4/5 mb-4"} onPress={handleSubmit}>
            <Text className={"text-white text-center text-xl"}>
              Create Account
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
  );
}
