import { MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import React from 'react'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useTheme } from '../../context/ThemeContext'
import PrivateRoute from '@/shared/PrivateRoute'

const _layout = () => {
  const { theme } = useTheme()
  
  // Theme-based colors
  const colors = {
    activeTint: theme === 'dark' ? '#ff9147' : '#ff7819',
    inactiveTint: theme === 'dark' ? '#666' : '#999',
    background: theme === 'dark' ? '#1a1a1a' : '#fff',
    border: theme === 'dark' ? '#333' : '#e5e5e5',
  }

  return (
   <>
   <PrivateRoute>
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.activeTint,
        tabBarInactiveTintColor: colors.inactiveTint,
        tabBarStyle: { 
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          paddingBottom: hp(0.8),
          paddingTop: hp(0.5),
          height: hp(8),
        },
        tabBarLabelStyle: {
          fontSize: hp(1.6),
          fontWeight: '500',
          marginBottom: hp(0.3),
        },
      }}
    >
        <Tabs.Screen 
       name="card"
       options={{
         title: 'Card',
         tabBarIcon: ({ color, size }) => (
           <MaterialIcons name="credit-card" color={color} size={hp(2.8)} />
         ),
       }}
        
         />
        <Tabs.Screen 
          name='contact' 
          options={{
            title: 'Contact',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="contacts" color={color} size={hp(2.8)} />
            ),
          }} 
        />
        
    </Tabs>
    </PrivateRoute>
   </>
  )
}

export default _layout

