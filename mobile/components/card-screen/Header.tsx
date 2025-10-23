import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { router } from 'expo-router'

const Header = () => {

    return (
        <View className=' absolute flex-row justify-between w-full items-center top-0 left-0 right-0 z-10 px-5 py-2'>
            <TouchableOpacity
            onPress={() => router.replace('/create-card')}
            >

                <Text className='text-primary text-base'>Cancel</Text>
            </TouchableOpacity>
            <Text className='text-lightTheme-text dark:text-darkTheme-text font-semibold text-base'>Blinq ✏️</Text>
            <Text className='text-primary text-base font-semibold'>Save</Text>
        </View>
    )
}

export default Header
