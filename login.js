import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }
  login = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        Alert.alert('Welcome Back!');
        this.props.navigation.navigate('Home');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };
  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ImageBackground style={styles.bg} source={require('../images/bg.png')}>
          <ScrollView>
            <Image style={styles.font} source={require('../images/font.png')} />
            <Text style={styles.label}>Login</Text>
            <View
              style={{
                borderWidth: 2,
                borderRadius: 20,
                width: '95%',
                alignSelf: 'center',
                backgroundColor: '#ffffffaa',
              }}>
              <View style={styles.footer}>
                <Feather name="at-sign" size={20} color="grey" />
                <TextInput
                  style={{
                    width: '90%',
                    height: 30,
                    borderBottomWidth: 1,
                    paddingLeft: 10,
                    borderBottomColor: 'grey',
                  }}
                  placeholder="Email ID"
                  onChangeText={(val) => {
                    this.setState({ email: val });
                  }}
                />
              </View>

              <View style={styles.footer}>
                <AntDesign name="lock" size={20} color="grey" />
                <TextInput
                  style={{
                    width: '90%',
                    height: 30,
                    borderBottomWidth: 1,
                    paddingLeft: 10,
                    borderBottomColor: 'grey',
                  }}
                  placeholder="Password"
                  onChangeText={(val) => {
                    this.setState({ password: val });
                  }}
                />
                
              </View>
              <Text
                style={{
                  marginTop: 10,
                  color: '#8A5321',
                  fontWeight: 'bold',
                  alignSelf: 'flex-end',
                  marginHorizontal: '5%',
                }}
                onPress={() => {
                  this.props.navigation.replace('Forgot');
                }}>
                Forgot Password?
              </Text>

              <TouchableOpacity
                style={{
                  backgroundColor: '#8A5321',
                  width: '90%',
                  height: 40,
                  marginTop: 30,
                  borderRadius: 10,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.login();
                }}>
                <Text style={{ fontSize: 18, color: 'white' }}>Login</Text>
              </TouchableOpacity>

              <Text
                style={{ marginTop: 30, alignSelf: 'center', color: 'grey' }}>
                Don't have an account? 
                <Text
                  style={{ color: '#8A5321', fontWeight: 'bold' }}
                  onPress={() => {
                    this.props.navigation.replace('SignUp');
                  }}>
                  
                  Register
                </Text>
              </Text>
            </View>
          </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  bg: {
    flex: 1,
    resizeMode: 'cover',
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: '5%',
    marginTop: -180,
  },
  footer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  font: {
    marginTop: -10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
