import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Bicycle, MapPin } from 'phosphor-react-native'

import { colors } from '../config/colors.js'
import { Button } from './Button.js';

const screens = [
  {
    name: 'Pontos',
    path: 'PointList',
    icon: MapPin,
  },
  {
    name: 'Alugueis',
    path: 'RentalList',
    icon: Bicycle,
  },
]

export function Footer({ children, currentScreen, onPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {children ? (
          children
        ) : (
          <>
            {screens.map(({ name, path, icon: Icon, }, index) => (
              <Button
                key={index + 1}
                style={{ backgroundColor: path === currentScreen ? colors.primary : colors.secondaryLigth }}
                leftIcon={Icon}
                text={name}
                onPress={() => onPress?.(path)}
              />
            ))}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 40,
    backgroundColor: '#FFF',
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    gap: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
  }
});
