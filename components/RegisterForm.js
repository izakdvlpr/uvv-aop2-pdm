import { SafeAreaView, StyleSheet, View, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { createUser, getUsers } from '../services/api.js'
import { useAuth } from '../contexts/AuthContext.js'
import { Field } from '../components/Field.js'
import { Label } from '../components/Label.js'
import { Input } from '../components/Input.js'
import { ErrorMessage } from '../components/ErrorMessage.js'
import { Button } from '../components/Button.js'

const schema = z
  .object({
    name: z
      .string({
        required_error: "Nome é obrigatório",
        invalid_type_error: "Nome deve ser um texto"
      })
      .min(1, "Nome não pode estar vazio"),
    email: z
      .string({
        required_error: "Email é obrigatório",
        invalid_type_error: "Email deve ser um texto"
      })
      .email("Formato de email inválido"),
    password: z
      .string({
        required_error: "Senha é obrigatória",
        invalid_type_error: "Senha deve ser um texto"
      })
      .min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z
      .string({
        required_error: "Confirmação de senha é obrigatória",
        invalid_type_error: "Confirmação de senha deve ser um texto"
      })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"]
  });

export function RegisterForm({ onNavigateToPointList }) {
  const { setUserId } = useAuth();

  const form = useForm({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data) {
    const users = await getUsers();
    
    if (users.data.some(user => user.email === data.email)) {
      Alert.alert('Usuário já cadastrado.', 'Já existe um usuário com este e-mail. Tente novamente com outro e-mail.')
      
      return;
    }
    
    const response = await createUser(data)

    if (response.error) {
      Alert.alert('Erro ao criar usuário.', 'Não foi possível criar o usuário. Tente novamente mais tarde.')

      return;
    }
    
    setUserId(response.userId)

    onNavigateToPointList()
  }

  return (
    <View style={styles.form}>
      <Field>
        <Label>Nome Completo</Label>
        
        <Input
          placeholder="Jhon Doe"
          onChangeText={text => form.setValue('name', text)}
          {...form.register('name')}
        />
        
        {form.formState.errors.name && <ErrorMessage>{form.formState.errors.name.message}</ErrorMessage>}
      </Field>

      <Field>
        <Label>E-mail</Label>
        
        <Input
          inputMode="email"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="jhondoe@example.com"
          onChangeText={text => form.setValue('email', text)}
          {...form.register('email')}
        />
        
        {form.formState.errors.email && <ErrorMessage>{form.formState.errors.email.message}</ErrorMessage>}
      </Field>

      <Field>
        <Label>Senha</Label>
        
        <Input
          placeholder={"*".repeat(16)}
          secureTextEntry
          onChangeText={text => form.setValue('password', text)}
          {...form.register('password')}
        />
        
        {form.formState.errors.password && <ErrorMessage>{form.formState.errors.password.message}</ErrorMessage>}
      </Field>

      <Field>
        <Label>Confirmar Senha</Label>
        
        <Input
          placeholder={"*".repeat(16)}
          secureTextEntry
          onChangeText={text => form.setValue('confirmPassword', text)}
          {...form.register('confirmPassword')}
        />
        
        {form.formState.errors.confirmPassword && <ErrorMessage>{form.formState.errors.confirmPassword.message}</ErrorMessage>}
      </Field>

      <Button
        isLoading={form.formState.isSubmitting}
        style={{ marginTop: 10 }}
        text="Criar Conta"
        onPress={form.handleSubmit(onSubmit)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
    gap: 10
  }
});
