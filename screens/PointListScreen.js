import { View, StyleSheet, StatusBar, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { List, MapPin } from 'phosphor-react-native'
import { useState, useEffect } from 'react'

import { FloatingIcon } from '../components/FloatingIcon'
import { Footer } from '../components/Footer'
import { colors } from '../config/colors';
import { getPoints } from '../services/api';

export function PointListScreen({ navigation }) {
  const [points, setPoints] = useState([]);
    
  useEffect(() => {
    getPoints().then((response) => setPoints(response.data))
  }, [])
  
  return (
    <View style={styles.container}> 
      <View style={styles.header}>
        <FloatingIcon icon={List} onPress={() => navigation.openDrawer()} />
      </View>
    
      <View style={styles.footer}>
        <Footer
          currentScreen={"PointList"}
          onPress={path => navigation.navigate(path)}
        />
      </View>
      
      <MapView
        style={styles.map} 
        showsBuildings={false}
        showsCompass={false} 
        showsIndoorLevelPicker={false}
        showsIndoors={false}
        showsMyLocationButton={false}
        showsPointsOfInterest={false}
        showsTraffic={false}
        showsUserLocation={false}
        userInterfaceStyle="light"
        customMapStyle={[
          {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          }
        ]}
        initialRegion={{
          latitude: -20.2639232,
          longitude: -40.2847451,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15
        }}
      >  
        {points.length > 0 && points.map((point, index) => (
          <Marker
            key={index + 1}
            coordinate={{
              latitude: Number(point.latitude),
              longitude: Number(point.longitude),
            }}
            onPress={() => navigation.navigate('PointDetails', { pointName: point.name })}
          >
            <MapPin weight='fill' size={40} color={colors.primary} />
          </Marker>
        ))}
      </MapView>
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
    position: 'absolute',
    top: Platform.OS === 'ios' ? StatusBar.currentHeight + 60 : StatusBar.currentHeight + 10,
    zIndex: 1000
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 1000
  },
  map: {
    width: '100%',
    height: '100%',
  },
});