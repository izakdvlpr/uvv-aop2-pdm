import { View, StyleSheet, Text } from 'react-native';
import { Bicycle } from 'phosphor-react-native';

import { colors } from '../config/colors.js'

export function Logo({ style }) {
  return (
    <View style={[styles.container, style]}>
      <Bicycle size={120} color={colors.primary} />

      <Text style={styles.title}>
        Livre-Mente
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.title
  }
});
