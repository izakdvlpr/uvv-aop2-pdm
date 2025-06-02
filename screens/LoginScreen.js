import { SafeAreaView, StyleSheet, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react'

import { colors } from '../config/colors.js'
import { Logo } from '../components/Logo.js'
import { RegisterForm } from '../components/RegisterForm.js';
import { LoginForm } from '../components/LoginForm.js';

export function LoginScreen({ navigation }) {
  const [type, setType] = useState('login')
  
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior='height'
        keyboardVerticalOffset={20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Logo style={{ marginTop: 40 }}/>

          {type === "login" && (
            <LoginForm onNavigateToPointList={() => navigation.navigate('PointList')} />
          )}
          
          {type === "register" && (
            <RegisterForm onNavigateToPointList={() => navigation.navigate('PointList')} />
          )}
          
          {type === "login" && (
            <View style={styles.textContainer}>
              <Text style={styles.text}>Não possui conta?</Text>
              
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setType("register")}
              >
                <Text style={[styles.text, { textDecorationLine: 'underline', color: colors.primary }]}>Clique aqui</Text>
              </TouchableOpacity>
            </View>
          )}
          
          {type === "register" && (
            <View style={styles.textContainer}>
              <Text style={styles.text}>Já possui conta?</Text>
              
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => setType("login")}
              >
                <Text style={[styles.text, { textDecorationLine: 'underline', color: colors.primary }]}>Clique aqui</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  keyboardAvoidingView: {
    flex: 1,
    padding: 30,
  },
  scrollContent: {
    flexGrow: 1,
  },
  textContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: colors.gray,
  }
});
