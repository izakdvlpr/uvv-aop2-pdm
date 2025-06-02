import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

import { AuthProvider } from './contexts/AuthContext.js'
import { LoginScreen } from './screens/LoginScreen.js';
import { PointListScreen } from './screens/PointListScreen.js';
import { RentalListScreen } from './screens/RentalListScreen.js';
import { PointDetailsScreen } from './screens/PointDetailsScreen.js';
import { CustomDrawerContent } from './components/CustomDrawerContent.js';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function PointListWithDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="PointListWithDrawer" component={PointListScreen} />
    </Drawer.Navigator>
  );
}

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login"
        options={{ headerShown: false }}
        component={LoginScreen}
      />
      
      <Stack.Screen
        name="PointList"
        options={{ headerShown: false }}
        component={PointListWithDrawer}
      />
      
      <Stack.Screen
        name="RentalList"
        options={{ headerShown: false }}
        component={RentalListScreen}
      />
      
      <Stack.Screen
        name="PointDetails"
        options={{ headerShown: false }}
        component={PointDetailsScreen}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
