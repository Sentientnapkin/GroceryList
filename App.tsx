import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {NavigationContainer} from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import ListScreen from "./screens/ListScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={"Login"} component={LoginScreen}
                      options={{ headerShown: false }}/>
        <Stack.Screen name={"SignIn"} component={SignInScreen}
                      options={{ headerShown: false }}/>
        <Stack.Screen name={"SignUp"} component={SignUpScreen}
                      options={{ headerShown: false }}/>
        <Stack.Screen name={"Home"} component={HomeScreen}
                      options={{ headerShown: false }}/>
        <Stack.Screen name={"List"} component={ListScreen}
                      options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
