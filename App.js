import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard
} from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

const B = ({ children })=> {
  return (
    <Text style={{fontWeight: 'bold'}}>{children}</Text>
  )
}

export default function App() {
  const baseUrl = 'https://saint-seiya-api.herokuapp.com/api/character';
  const imageBaseUrl = 'https://diegochagas.com/saint-seiya-api';
  const [query, setQuery] = React.useState(1);
  const [cdz, setCdz] = React.useState(null);
  
  const fetchCdz = async () => {
    const res = await fetch(`${baseUrl}/${query}`);
    const json = await res.json();
    json.image = `${imageBaseUrl}/${json.image}`;
    setCdz({name: json.name, id: json.id, gender: json.gender, nationality: json.nationality, image: json.image})
    Keyboard.dismiss()
  };

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('./cdz.png')} style={styles.img} />
      </View>
      <View>
        <TextInput
          keyboardType="numeric"
          style={styles.inputBox}
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity activeOpacity={0.7} onPress={fetchCdz}>
          <Text style={styles.btn}>Pesquisar</Text>
        </TouchableOpacity>

        {cdz && (
          <View style={styles.card}>
            <Image source={{ uri: cdz.image }} style={[styles.img, {width: 150, resizeMode: 'center'}]} />
            <View>
              <Text><B>id:</B> {cdz.id}</Text>
              <Text><B>Character:</B> {cdz.name}</Text>
              <Text><B>Gender:</B> {cdz.gender}</Text>
              <Text><B>Nationality:</B> {cdz.nationality}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000026',
  },
  inputBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 22,
    outlineStyle: 'none',
    width: 200,
  },
  btn: {
    padding: 10,
    backgroundColor: '#dbde03',
    color: '#000026',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 22,
    width: 200,
    marginTop: 10,
    textAlign: 'center',
    borderRadius: 10,
  },
  img: {
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  card: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    marginBottom: 20,
  },
});
