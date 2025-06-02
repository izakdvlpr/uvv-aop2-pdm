import { Text, StyleSheet } from 'react-native'

import { colors } from '../config/colors.js'

export function ErrorMessage({ children }) {
  return (
    <Text style={styles.error}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  error: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: colors.error,
  }
});