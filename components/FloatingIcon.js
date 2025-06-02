import { TouchableOpacity, StyleSheet } from 'react-native';

import { colors } from '../config/colors';

export function FloatingIcon({ icon: Icon, onPress }) {
  return (
    <TouchableOpacity 
      style={styles.floatingButton} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Icon size={34} color={colors.primary} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});