import React, { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import Home from "./src/Pages/Home";
import { Updates } from "expo";
import { StatusBar } from 'expo-status-bar';


var styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});

export default function App() {
  useEffect(() => {
    async function updateApp() {
      const { isAvailable } = await Updates.checkForUpdateAsync();
      if (isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      } //return the function itself to reference
    }
    updateApp()
  }, []);

  return (
    
    <ScrollView style={styles.scrollView} contentContainerStyle={{ flex: 1 }}>
      <StatusBar style="light" />
      <Home />
    </ScrollView>
  );
}
