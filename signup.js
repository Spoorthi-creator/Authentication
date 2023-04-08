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
  Platform
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';
export default class SignUp extends React.Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      name: '',
    };
  }
    signup = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        Alert.alert('User Created!');
        db.collection('accounts').add({
          email: this.state.email,
          password: this.state.password,
          name: this.state.name,
        });
        this.props.navigation.replace('Home');
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert(errorMessage);
      });
  };
  render() {
    return (
       <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <ImageBackground style={styles.bg} source={require('../images/bg.png')}>
          <ScrollView>
            <Image style={styles.font} source={require('../images/font.png')} />
            <Text style={styles.label}>SignUp</Text>
            <View
              style={{
                borderWidth: 2,
                borderRadius: 20,
                alignSelf: 'center',
                 width: '95%',
                backgroundColor: '#ffffffaa',
              }}>
              <View style={styles.footer}>
                <AntDesign name="user" size={24} color="grey" />
                <TextInput
                  style={{
                    width: '90%',
                    height: 30,
                    borderBottomWidth: 1,
                    paddingLeft: 10,
                    borderBottomColor: 'grey',
                  }}
                  placeholder="Name"
                  onChangeText={(val) => {
                    this.setState({ name: val });
                  }}
                />
              </View>

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
                  this.signup();
                }}>
                <Text style={{ fontSize: 18, color: 'white' }}>Sign Up</Text>
              </TouchableOpacity>

              <Text
                style={{ marginTop: 30, alignSelf: 'center', color: 'grey' }}>
                Already have an account?
                <Text
                  style={{ color: '#8A5321', fontWeight: 'bold' }}
                  onPress={() => {
                    this.props.navigation.replace('Login');
                  }}>
                  
                  Login
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
