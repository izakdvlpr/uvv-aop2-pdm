import { View, StyleSheet, StatusBar, Platform, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { CaretLeft, Circle, CheckCircle } from 'phosphor-react-native'
import { useEffect, useState } from 'react'

import { createRental, getVehicles } from '../services/api.js'
import { useAuth } from '../contexts/AuthContext.js'
import { FloatingIcon } from '../components/FloatingIcon.js'
import { Footer } from '../components/Footer.js'
import { colors } from '../config/colors.js';
import { Button } from '../components/Button.js';

export const vehicleImages = {
  'bicicletas.png': require('../assets/bicicletas.png'),
  'patinete.png': require('../assets/patinete.png'),
  'patins.png': require('../assets/patins.png'),
  'skate.png': require('../assets/skate.png'),
};

export const paymentMethods = [
  'PIX',
  'Cartão de Crédito',
  'Cartão de Débito',
  'Dinheiro',
]

export function PointDetailsScreen({ navigation, route }) {
  const { userId } = useAuth()
  
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  async function handleRental() {
    setIsLoading(true);
    
    const startTime = new Date()
    
    const response = await createRental({
      userId,
      vehicleId: selectedVehicle,
      startTime: startTime.toISOString(),
      endTime: new Date(startTime.getTime() + 60 * 60 * 1000).toISOString(), // 1 hour later
    })
    
    setIsLoading(false);
    
    if (response?.error) {
      Alert.alert('Erro ao realizar o aluguel', 'Não foi possível realizar o aluguel. Tente novamente mais tarde.')
      
      return;
    }
    
    navigation.navigate('RentalList');
  }
  
  useEffect(() => {
    getVehicles().then((response) => setVehicles(response.data))
  }, [])
  
  return (
    <View style={styles.container}> 
      <View style={styles.header}>
        <View style={{ position: 'absolute', left: 20, top: Platform.OS === 'ios' ? StatusBar.currentHeight + 60 : StatusBar.currentHeight + 10 }}>
          <FloatingIcon icon={CaretLeft} onPress={() => navigation.navigate('PointList')} />
        </View>
          
        <Text style={styles.title}>{route.params.pointName}</Text>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.subtitle}>Veiculos disponíveis:</Text>
          
          <View style={styles.vehicleGrid}>
            {vehicles.map((vehicle, index) => (
              <TouchableOpacity
                key={index + 1}
                activeOpacity={0.9}
                style={[styles.vehicleCard, { borderColor: selectedVehicle === vehicle.name ? colors.primary : 'transparent', borderWidth: selectedVehicle === vehicle.name ? 2 : 1 }]}
                onPress={() => setSelectedVehicle(vehicle.name)}
              >
                <Text style={styles.vehicleTitle}>{vehicle.name}</Text>
                <Image style={styles.vehicleImage} source={vehicleImages[vehicle.image_path]} />
              </TouchableOpacity>
            ))}
          </View>
          
          <Text style={styles.subtitle}>Método de pagamento:</Text>
          
          <View style={[styles.paymentMethodList, ]}>
            {paymentMethods.map((method, index) => (
              <TouchableOpacity
                key={index + 1}
                style={styles.paymentMethodCard}
                activeOpacity={0.9}
                onPress={() => setSelectedPaymentMethod(method)}
              >
                {selectedPaymentMethod === method ? (
                  <Circle size={30} weight='fill' color={colors.primary} />
                ) : (
                  <Circle size={30} />
                )}
                
                <Text style={{ fontSize: 16, color: selectedPaymentMethod === method ? colors.primary : colors.black }}>{method}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    
      <View style={styles.footer}>
        <Footer>
          <Button
            text="Alugar"
            leftIcon={CheckCircle}
            isLoading={isLoading}
            isDisabled={selectedPaymentMethod === null || selectedVehicle === null}
            onPress={handleRental}
          />
        </Footer>
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
  vehicleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  vehicleCard: {
    width: '48%',
    padding: 10,
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  vehicleTitle: {
    fontSize: 16,
    color: colors.black,
    marginVertical: 5,
    fontWeight: '500',
    textAlign: 'center',
  },
  vehicleImage: {
    width: 120,
    height: 120,
    borderRadius: 250,
    backgroundColor: colors.lightGray,
  },
  paymentMethodList: {
    flexDirection: 'column',
    gap: 5,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 1000
  }
});