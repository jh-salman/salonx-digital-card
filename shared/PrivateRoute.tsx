import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { Redirect } from 'expo-router';


interface PrivateRouteProps {
  children : React.ReactNode;
}



const PrivateRoute = ({ children} :PrivateRouteProps) => {
    const {user, loading, error} = useAuth();
    const {colors} = useTheme();
    if(loading){
        return (
            <View style={[styles.loadingContainer, {backgroundColor: colors.background}]}>
                <ActivityIndicator size="large" color={colors.primary} />

            </View>
        )}

    if(error){
        return (
            <View style={[styles.errorContainer, {backgroundColor: colors.background}]}>
                <Text style={[styles.errorText, {color: colors.text}]}>{error}</Text>
            </View>
        )
    }

    if(!user){
        return <Redirect href="/(auth)/login" />
    }

  return (
    <>
    {children}
    </>
  )
}

export default PrivateRoute

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        fontWeight: 'bold',
    }
})