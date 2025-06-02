import { Text, StyleSheet } from 'react-native'

import { colors } from '../config/colors.js'

export function Label({ children }) {
  return (
    <Text style={styles.text}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    textTransform: 'uppercase',
    color: colors.primary,
  },
});