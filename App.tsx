import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button
} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}> Tortenio </Text>
      <Text>Usuario: </Text>
      <TextInput placeholder="Escribe aqui"></TextInput>
      <Text>Contraseña: </Text>
      <TextInput placeholder="Escribe aqui"></TextInput>
      <Button title="Iniciar Secion" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange', // Aquí estableces el fondo naranja
  },
  text: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
});