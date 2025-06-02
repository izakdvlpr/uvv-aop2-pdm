import { StyleSheet, View, Alert } from 'react-native';
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { getUsers } from '../services/api.js'
import { useAuth } from '../contexts/AuthContext.js'
import { Field } from '../components/Field.js'
import { Label } from '../components/Label.js'
import { Input } from '../components/Input.js'
import { ErrorMessage } from '../components/ErrorMessage.js'
import { Button } from '../components/Button.js'

const schema = z
  .object({
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
      .min(6, "Senha deve ter pelo menos 6 caracteres")
  })

export function LoginForm({ onNavigateToPointList }) {
  const { setUserId } = useAuth();

  const form = useForm({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data) {
    const users = await getUsers()
    
    if (users.error) {
      Alert.alert('Erro ao buscar usuários', 'Não foi possível buscar os usuários. Tente novamente mais tarde.')
      
      return;
    }

    const user = users.data.find(user => user.email === data.email && user.password === data.password)
    
    if (!user) {
      Alert.alert('Usuário não encontrado.', 'E-mail ou senha inválidos. Tente novamente.')

      return;
    }
    
    setUserId(user.id)

    onNavigateToPointList()
  }

  return (
    <View style={styles.form}>
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

      <Button
        isLoading={form.formState.isSubmitting}
        style={{ marginTop: 10 }}
        text="Entrar"
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
