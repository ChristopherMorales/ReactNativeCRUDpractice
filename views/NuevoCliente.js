import React, {useState, useEffect} from 'react';

import {StyleSheet, View, Platform} from 'react-native';

import {
  TextInput,
  Headline,
  Button,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';

import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({navigation, route}) => {
  const {setConsultarAPI} = route.params;
  // campos de formulario
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [alerta, setAlerta] = useState(false);

  // detectar si estamos editando o no
  useEffect(() => {
    if (route.params.cliente) {
      const {nombre, telefono, correo, empresa} = route.params.cliente;

      setNombre(nombre);
      setTelefono(telefono);
      setCorreo(correo);
      setEmpresa(empresa);
    }
  }, []);

  // almacena el cliente en la base de datos

  const guardarCliente = async () => {
    // validar

    if (nombre === '' || telefono === '' || correo === '' || empresa === '') {
      setAlerta(true);
      return;
    }

    // general el cliente

    const cliente = {nombre, telefono, correo, empresa};

    console.log(cliente);

    // Si estamos editando o creando un nuevo cliente
    if (route.params.cliente) {
      const {id} = route.params.cliente;

      cliente.id = id;

      const url = `http://localhost:3000/clientes/${id}`;

      try {
        await axios.put(url, cliente);
      } catch (error) {
        console.log(error);
      }
    } else {
      // guardar el cliente en la API
      try {
        if (Platform.OS === 'ios') {
          // Para iOS
          await axios.post('http://localhost:3000/clientes', cliente);
        } else {
          //Para android
          await axios.post('http://10.0.2.2:3000/clientes', cliente);
        }
      } catch (e) {
        console.log(e);
      }
    }

    // redireccionar
    navigation.navigate('Inicio');

    // limpiar el form
    setNombre('');
    setTelefono('');
    setCorreo('');
    setEmpresa('');

    // cambiar a true para traernos el nuevo cliente
    setConsultarAPI(true);
  };

  return (
    <View styles={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>Añadir Nuevo Cliente</Headline>
      <TextInput
        label="Nombre"
        placeholder="Christopher"
        onChangeText={texto => setNombre(texto)}
        value={nombre}
        style={styles.input}
      />
      <TextInput
        label="Telefono"
        placeholder="(787) 555-5555"
        onChangeText={texto => setTelefono(texto)}
        value={telefono}
        style={styles.input}
      />
      <TextInput
        label="Correo"
        placeholder="correo@correo.com"
        onChangeText={texto => setCorreo(texto)}
        value={correo}
        style={styles.input}
      />
      <TextInput
        label="Empresa"
        placeholder="Nombre Empresa"
        onChangeText={texto => setEmpresa(texto)}
        value={empresa}
        style={styles.input}
      />

      <Button mode="contained" onPress={() => guardarCliente()}>
        Guardar Cliente
      </Button>

      <Portal>
        <Dialog visible={alerta} onDismiss={() => setAlerta(false)}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph> Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setAlerta(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});

export default NuevoCliente;
