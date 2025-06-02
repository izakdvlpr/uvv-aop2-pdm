import axios from 'axios'

const FIREBASE_URL = 'https://uvv-aop2-pdm-default-rtdb.firebaseio.com'

export async function createUser({ name, email, password }) {
  try {
    const response = await axios.post(
      `${FIREBASE_URL}/users.json`,
      {
        name,
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    return { userId: response.data.name }
  } catch (error) {
    console.log(error)
    
    return { error }
  }
}

export async function getUsers() {
  try {
    const response = await axios.get(`${FIREBASE_URL}/users.json`);
    
    const users = Object.entries(response.data || {}).map(([id, user]) => ({
      id,
      ...user,
    }));
    
    return { data: users }
  } catch (error) {
    console.log(error)
    
    return { error }
  }
}

export async function getPoints() {
  try {
    const response = await axios.get(`${FIREBASE_URL}/points.json`);
    
    const points = Object.entries(response.data || {}).map(([name, point]) => ({
      name,
      ...point,
    }));
    
    return { data: points };
  } catch (error) {
    console.log(error)
    
    return { error };
  }
}

export async function getVehicles() {
  try {
    const response = await axios.get(`${FIREBASE_URL}/vehicles.json`);
    
    const vehicles = Object.entries(response.data || {}).map(([name, vehicle]) => ({
      name,
      ...vehicle
    }));
    
    return { data: vehicles };
  } catch (error) {
    console.log(error)
    
    return { error };
  }
}

export async function createRental({ userId, vehicleId, paymentMethod, startTime, endTime }) {
  try {
    const response = await axios.post(
      `${FIREBASE_URL}/rentals.json`,
      {
        user_id: userId,
        vehicle_id: vehicleId,
        payment_method: paymentMethod,
        start_time: startTime,
        end_time: endTime
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    return { rentalId: response.data.name }
  } catch (error) {
    console.log(error)
    
    return { error }
  }
}

export async function getRentals() {
  try {
    const response = await axios.get(`${FIREBASE_URL}/rentals.json`);
    
    const rentals = Object.entries(response.data || {}).map(([id, rental]) => ({
      id,
      ...rental
    }));
    
    return { data: rentals };
  } catch (error) {
    console.log(error)
    
    return { error };
  }
}