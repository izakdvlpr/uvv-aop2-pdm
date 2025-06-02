import { View, StyleSheet, StatusBar, Platform, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { CaretLeft, Circle, CheckCircle, SmileySad } from 'phosphor-react-native'
import { useEffect, useState } from 'react'

import { getRentals, getVehicles } from '../services/api.js'
import { useAuth } from '../contexts/AuthContext.js'
import { FloatingIcon } from '../components/FloatingIcon.js'
import { Footer } from '../components/Footer.js'
import { colors } from '../config/colors.js';
import { Button } from '../components/Button.js';
import { vehicleImages, paymentMethods } from './PointDetailsScreen.js'

export function RentalListScreen({ navigation }) {
  const { userId } = useAuth();
  
  const [rentals, setRentals] = useState([]);
  
  async function handleGetRentals() {
    const rentals = await getRentals();
    const vehicles = await getVehicles();
    
    if (rentals.error || vehicles.error) {
      Alert.alert('Erro', 'Não foi possível carregar os alugueis. Tente novamente mais tarde.');
      return;
    }
    
    const rentalsWithVehicles = rentals.data.map(rental => {
      const vehicle = vehicles.data.find(v => v.name === rental.vehicle_id);
      
      return {
        ...rental,
        vehicle: vehicle ? {
          ...vehicle,
          image: vehicleImages[vehicle.image_path] || null
        } : null
      };
    });
    
    setRentals(rentalsWithVehicles);
  }
  
  useEffect(() => {
    handleGetRentals()
  }, [])
  
  return (
    <View style={styles.container}> 
      {!!rentals.length && (
        <View style={styles.header}>
          <Text style={styles.title}>Alugueis</Text>
        </View>
      )}
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          {!rentals.length && (
            <View style={{ alignItems: 'center', marginTop: 50 }}>
              <SmileySad size={60} color={colors.gray} />
              <Text style={{ fontSize: 18, color: colors.gray }}>Nenhum aluguel encontrado</Text>
            </View>
          )}
          
          <View style={styles.rentalList}>
            {rentals.map((rental, index) => (
              <View style={styles.rentalItem} key={index + 1}>
                <View style={styles.rentalCard}>
                  <Text style={styles.rentalTitle}>{rental.vehicle.name}</Text>
                  <Text style={styles.rentalSubtitle}>R${rental.vehicle.price}</Text>
                  <Text style={styles.rentalDescription}>{new Date(rental.start_time).toLocaleString('pt-BR')}</Text>
                  <Text style={styles.rentalDescription}>{new Date(rental.end_time).toLocaleString('pt-BR')}</Text>
                </View>
                
                <Image style={styles.rentalImage} source={rental.vehicle.image} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    
      <View style={styles.footer}>
        <Footer
          currentScreen={"RentalList"}
          onPress={path => navigation.navigate(path)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    width: '100%',
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight + 70 : StatusBar.currentHeight + 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, 
  },
  content: {
    marginTop: 40,
    paddingHorizontal: 20,
    marginBottom: 90,
    gap: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 18,
    color: colors.black,
  },
  rentalList: {
    flexDirection: 'column',
    gap: 10,
  },
  rentalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 8,
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rentalCard: {
    flex: 1,
    padding: 10,
    marginRight: 10,
  },
  rentalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  rentalSubtitle: {
    fontSize: 16,
    color: colors.gray,
  },
  rentalDescription: {
    fontSize: 14,
    color: colors.darkGray,
  },
  rentalImage: {
    width: 100,
    height: 100,
    borderRadius: 250,
    backgroundColor: colors.lightGray,
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 1000
  }
});