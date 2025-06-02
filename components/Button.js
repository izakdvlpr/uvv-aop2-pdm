import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { colors } from '../config/colors.js';

export function Button({ leftIcon: LeftIcon, isLoading, isDisabled, text, style, ...rest }) {
  return (
    <TouchableOpacity
      style={[styles.button, style, ((isLoading || isDisabled) && styles.disabled)]}
      disabled={isLoading || isDisabled}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.cardOrInput} />
      ) : (
        <>
          {LeftIcon && <LeftIcon size={24} color={colors.white} />}
        
          <Text style={styles.text}>{text}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 15,
    borderRadius: 8,
    backgroundColor: colors.primary,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: colors.cardOrInput,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
