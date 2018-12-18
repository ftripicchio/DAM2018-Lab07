import React, {Component} from 'react';
import {ToastAndroid,Button, StyleSheet, Text, TextInput, Picker, View,
Switch, CheckBox, Slider} from 'react-native';


export default class AppBanco extends Component {
 constructor(props) {
 super(props);
 this.state = {
     moneda:'Dolar',
     capitalInicial:0,
     capitalFinal: 0,
     resultado: '',
     dias: 10,
     monto: 0,
     vencimiento: false,
     mail: '',
     cuit: '',
     terminos: false,
     intereses: 0,
     tasa: 0
 };
 this.hacerPlazoFijo = this.hacerPlazoFijo.bind(this);
 }
 hacerPlazoFijo(){
     ToastAndroid.show('Presiono el boton de hacer plazo fijo!', ToastAndroid.LONG);
     if (this.state.mail === '' || this.state.cuit === '' || this.state.monto === '' || this.state.monto <= 0 || !this.state.terminos) {
         this.setState({ resultado: 'ERROR: Complete todos los campos requeridos' });
     } else {
         if (this.state.monto < 5000) {
             if (this.state.dias < 30) {
                 this.state.tasa = 0.25
             } else {
                 this.state.tasa = 0.275
             }
         } else if (this.state.monto >= 5000 && this.state.monto < 99999) {
             if (this.state.dias < 30) {
                 this.state.tasa = 0.3
             } else {
                 this.state.tasa = 0.323
             }
         } else {
             if (this.state.dias < 30) {
                 this.state.tasa = 0.35
             } else {
                 this.state.tasa = 0.385
             }
         }
         this.state.intereses = this.state.monto * (Math.pow(1 + this.state.tasa, this.state.dias / 360) - 1);
         this.setState({ resultado: 'Plazo fijo confirmado - intereses: ' + this.state.intereses + ', dias: ' + this.state.dias + ', monto: ' + this.state.monto + ', avisar vencimiento: ' + this.state.vencimiento + ', moneda:' + this.state.moneda });
     }

     
 }

 render() {
 return (
     <View style={styles.container}>

    <Text>Correo Electronico</Text>
    <TextInput onChangeText={(text) => this.setState({ mail: text })}>
             correo@mail.com
    </TextInput>

    <Text>CUIT</Text>
    <TextInput onChangeText={(text) => this.setState({ cuit: text })}>
             00-00000000-0
    </TextInput>

 <Text>Moneda</Text>
 <Picker
 style={{width: 200}}
 selectedValue={this.state.moneda}
 onValueChange={(valor) => this.setState({moneda:valor})}>
 <Picker.Item label="Dolar" value="Dolar" />
 <Picker.Item label="Pesos ARS" value="Pesos ARS" />
 </Picker>

 <Text>Monto</Text>
 <TextInput keyboardType='numeric' onChangeText={(text) => this.setState({ monto: text })}>000</TextInput>

 <Text>Dias</Text>
 <Slider minimumValue={10} maximumValue={90} step={1} onValueChange={(valor) => this.setState({ dias: valor })}></Slider>
 <Text>{this.state.dias} dias</Text>

 <Switch onValueChange={(valor) => this.setState({ vencimiento: valor })}></Switch>
 <Text>Avisar por mail</Text>

 <CheckBox title='Acepto condiciones' onValueChange={(valor) => this.setState({ terminos: valor })} />

 <Button title="Hacer Plazo Fijo"
 color="#FF0000"
 onPress={this.hacerPlazoFijo}>
 </Button>

 <Text>{this.state.resultado}</Text>
 </View>
 );
 }
}

const styles = StyleSheet.create({
 container: {
 flex: 1,
 flexDirection: 'column',
 justifyContent: 'flex-start',
 alignItems: 'flex-start',
 backgroundColor: '#F5FCFF',
 },
 welcome: {
 fontSize: 20,
 textAlign: 'center',
 margin: 10,
 },
 instructions: {
 textAlign: 'center',
 color: '#333333',
 marginBottom: 5,
 },
 });