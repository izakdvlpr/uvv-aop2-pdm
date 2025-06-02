import { View, StyleSheet } from 'react-native';

export function Field({ children }) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    gap: 8
  },
});