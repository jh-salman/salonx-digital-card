import { 
    StyleSheet, 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity, 
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView
  } from 'react-native';
  import React, { useState } from 'react';
  import { useAuth } from '@/context/AuthContext';
  import { useTheme } from '@/context/ThemeContext';
  import { useRouter } from 'expo-router';
  import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
  
  const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useAuth();
    const { colors } = useTheme();
    const router = useRouter();
  
    const handleLogin = async () => {
      if (!email || !password) {
        alert('Please enter both email and password');
        return;
      }
      await login(email, password);
    };
  
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, { backgroundColor: colors.background }]}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.headerContainer}>
            <Text style={[styles.title, { color: colors.text }]}>
              Welcome Back
            </Text>
            <Text style={[styles.subtitle, { color: colors.text, opacity: 0.6 }]}>
              Sign in to continue
            </Text>
          </View>
  
          <View style={styles.formContainer}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: colors.card,
                    color: colors.text,
                    borderColor: colors.border
                  }
                ]}
                placeholder="Enter your email"
                placeholderTextColor={colors.text + '80'}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
  
            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={[styles.label, { color: colors.text }]}>Password</Text>
              <TextInput
                style={[
                  styles.input,
                  { 
                    backgroundColor: colors.card,
                    color: colors.text,
                    borderColor: colors.border
                  }
                ]}
                placeholder="Enter your password"
                placeholderTextColor={colors.text + '80'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>
  
            {/* Error Message */}
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
  
            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                { backgroundColor: colors.primary },
                loading && styles.disabledButton
              ]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>
  
            {/* Forgot Password */}
            <TouchableOpacity style={styles.forgotPasswordButton}>
              <Text style={[styles.forgotPasswordText, { color: colors.primary }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
  
            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
              <Text style={[styles.dividerText, { color: colors.text, opacity: 0.6 }]}>
                OR
              </Text>
              <View style={[styles.divider, { backgroundColor: colors.border }]} />
            </View>
  
            {/* Sign Up Link */}
            <View style={styles.signupContainer}>
              <Text style={[styles.signupText, { color: colors.text, opacity: 0.7 }]}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                <Text style={[styles.signupLink, { color: colors.primary }]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  };
  
  export default Login;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      padding: wp(6),
    },
    headerContainer: {
      marginBottom: hp(4),
      alignItems: 'center',
    },
    title: {
      fontSize: wp(8),
      fontWeight: 'bold',
      marginBottom: hp(1),
    },
    subtitle: {
      fontSize: wp(4),
    },
    formContainer: {
      width: '100%',
    },
    inputContainer: {
      marginBottom: hp(2.5),
    },
    label: {
      fontSize: wp(4),
      fontWeight: '600',
      marginBottom: hp(0.8),
    },
    input: {
      height: hp(6),
      borderWidth: 1,
      borderRadius: wp(3),
      paddingHorizontal: wp(4),
      fontSize: wp(4),
    },
    errorContainer: {
      backgroundColor: '#ffebee',
      padding: wp(3),
      borderRadius: wp(2),
      marginBottom: hp(2),
    },
    errorText: {
      color: '#c62828',
      fontSize: wp(3.5),
      textAlign: 'center',
    },
    loginButton: {
      height: hp(6.5),
      borderRadius: wp(3),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: hp(1),
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    disabledButton: {
      opacity: 0.6,
    },
    loginButtonText: {
      color: '#ffffff',
      fontSize: wp(4.5),
      fontWeight: '600',
    },
    forgotPasswordButton: {
      alignItems: 'center',
      marginTop: hp(2),
    },
    forgotPasswordText: {
      fontSize: wp(3.8),
      fontWeight: '500',
    },
    dividerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: hp(3),
    },
    divider: {
      flex: 1,
      height: 1,
    },
    dividerText: {
      marginHorizontal: wp(3),
      fontSize: wp(3.5),
    },
    signupContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    signupText: {
      fontSize: wp(4),
    },
    signupLink: {
      fontSize: wp(4),
      fontWeight: '600',
    },
  });