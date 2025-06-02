import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

import { useAuth } from '../contexts/AuthContext';
import { Logo } from './Logo';
import { colors } from '../config/colors';

const { height } = Dimensions.get('window');

export function CustomDrawerContent({ navigation }) {
  const { setUserId } = useAuth();
  
  return (
    <SafeAreaView style={styles.drawerContainer}>
      <DrawerContentScrollView
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.drawerContent}>
          <View style={styles.drawerBody}>
            <Logo />
            
            <TouchableOpacity 
              style={[styles.drawerItem, { marginTop: 40 }]}
              onPress={() => navigation.navigate('PointListWithDrawer')}
            >
              <Text style={styles.drawerItemText}>Lista de Pontos</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.drawerItem}
              onPress={() => navigation.navigate('RentalList')}
            >
              <Text style={styles.drawerItemText}>Lista de Aluguéis</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.drawerFooter}>
            <Text style={[styles.drawerItemText, { textAlign: 'center', color: colors.gray }]}>
              Livre-mente
            </Text>
            
            <Text style={[styles.drawerItemText, { textAlign: 'center', color: colors.gray }]}>
              v1.0.0
            </Text>
            
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={() => {
                setUserId(null);
                navigation.navigate('Login');
              }}
            >
              <Text style={[styles.drawerItemText, styles.logoutText]}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    flexGrow: 1,
    minHeight: height - 100,
  },
  drawerContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  drawerBody: {
    flex: 1,
    paddingHorizontal: 10,
  },
  drawerFooter: {
    padding: 20,
  },
  logoutButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  drawerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  drawerItemText: {
    fontSize: 16,
    color: colors.gray,
  },
  logoutText: {
    color: colors.error,
    fontWeight: 'bold',
  },
});