import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StackScreen from './src/navigation/StackScreen'
import { Provider } from 'react-redux'
import store from './src/redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <StackScreen/>
    </Provider>
  )
}
const styles = StyleSheet.create({})