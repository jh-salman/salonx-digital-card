import { StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useTheme } from '@/context/ThemeContext'

const Layout = () => {
  const theme = useColorScheme();
  const { colors } = useTheme();
  return (
    <>
     
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="create-card" />
        <Stack.Screen name="preview-card" />
      </Stack>
    </>
  )
}

export default Layout

const styles = StyleSheet.create({})