import React, {useRef, useState} from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native';

import api from './src/services/api';

export default function App() {

  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);

  async function buscar(){
    if(cep === ''){
      alert('Digite um CEP válido !');
      setCep('');
      return;
    }
    try{
      const response = await api.get(`/${cep}/json`);
      setCepUser(response.data);
      Keyboard.dismiss();
    }catch(error){
      alert('Error: '+ error);
    }
  }

  function limpar(){
    setCep('');
    setCepUser(null);
    inputRef.current.focus();
  }

 return (
   <SafeAreaView style={styles.container}>
    <View style={{alignItems:'center'}}>
      <Text style={styles.text}>Digite o CEP desejado</Text>
      <TextInput 
        style={styles.input}
        placeholder='Ex. 12345678'
        value={cep}
        onChangeText={(texto)=> setCep(texto)}
        keyboardType="numeric"
        ref={inputRef}
      />
    </View>
    <View style={styles.areaBtn}>

      <TouchableOpacity 
      style={[styles.botao,{backgroundColor:'#1d75cd'}]}
      onPress={buscar}
      >
        <Text style={styles.botaoText}>Buscar</Text>
      </TouchableOpacity>

      <TouchableOpacity 
      style={[styles.botao,{backgroundColor:'#cd3e1d'}]}
      onPress={limpar}
      >
        <Text style={styles.botaoText}>Limpar</Text>
      </TouchableOpacity>
    </View>

    {cepUser && 
      <View style={styles.resultado}>
      <Text style={styles.itemText}>CEP : {cepUser.cep}</Text>
      <Text style={styles.itemText}>Logradouro : {cepUser.logradouro}</Text>
      <Text style={styles.itemText}>Complemento : {cepUser.complemento}</Text>
      <Text style={styles.itemText}>Bairro : {cepUser.bairro}</Text>
      <Text style={styles.itemText}>Cidade : {cepUser.localidade}</Text>
      <Text style={styles.itemText}>UF : {cepUser.uf}</Text>
      <Text style={styles.itemText}>Área DDD : ({cepUser.ddd})</Text>
    </View>
    }
        
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }, 
  text:{
    marginTop:25,
    marginBottom:15,
    fontSize:25,
    fontWeight:'bold'
  },
  input:{
    backgroundColor:"#fff",
    borderWidth:1,
    borderColor:'#ddd',
    borderRadius:5,
    width:'90%',
    padding:10,
    fontSize:18
  },
  areaBtn:{
    alignItems:'center',
    flexDirection:'row',
    marginTop:15,
    justifyContent:'space-around'
  },
  botao:{
    height:50,
    justifyContent:'center',
    alignItems:'center',
    padding:10,
    borderRadius:5,
  },
  botaoText:{
    fontSize:22,
    color:'#fff'
  },
  resultado:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  itemText:{
    fontSize:22,
    color:'#000'
  }
})