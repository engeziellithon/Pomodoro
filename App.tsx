import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import Home from './src/Pages/Home'

var styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
})

export default function App() {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={{ flex: 1 }}>
      <Home />
    </ScrollView>
  )
}
