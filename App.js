import useRoute from "./router";
import { createStackNavigator } from "@react-navigation/stack";

import * as SplashScreen from "expo-splash-screen";
import { useState, useEffect, useCallback } from "react";
import * as Font from "expo-font";

import { LoginScreen, RegistrationScreen } from "./Screens/auth";
import { View, Text } from "react-native";

import {
  CreatePostsScreen,
  Home,
  PostsScreen,
  ProfileScreen,
} from "./Screens/main";

import { NavigationContainer } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

const loadFonts = async () => {
  await Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
  });
};
const AuthStack = createStackNavigator();

export default function App() {
  // const routing = useRoute();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await loadFonts();
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    // <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
    //   <Text>
    //     Hello asdfasdf asdfasdfsdfa sdfasdfsdfsd fasdfasdfas dfasdfasdf
    //   </Text>
    // </View>
    <NavigationContainer onLayout={onLayoutRootView}>
      <AuthStack.Navigator initialRouteName="Home">
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Registration"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
      </AuthStack.Navigator>

      {/* <StatusBar style="auto" /> */}
    </NavigationContainer>
  );
}
