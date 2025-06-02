import { TextInput, StyleSheet } from 'react-native'

import { colors } from '../config/colors.js'

export function Input(props) {
  return (
    <TextInput
      placeholderTextColor={colors.placeholder}
      style={styles.input}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.cardOrInput,
    borderRadius: 8,
    height: 60,
    paddingHorizontal: 20,
    fontSize: 16,
    color: colors.black,
  },
});