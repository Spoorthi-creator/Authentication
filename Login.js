import {useState} from 'react';
import { StyleSheet, Text, View,Image,TouchableOpacity, ImageBackground,Dimensions,Pressable, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import styles from "../styles";

import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTogglePasswordVisibility } from "./useTogglePasswordVisibility";

// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {signInWithEmailAndPassword,auth,sendPasswordResetEmail,createUserWithEmailAndPassword} from "../firebase"
//import firebase from "firebase";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';



export default function Login({ navigation }) {
  const [email, setEmail] = useState(null)
  //const [name, setName] = useState('')
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [validationMessage, setValidationMessage] = useState('')
  const { height, width } = Dimensions.get("window");
  const formButtonScale = useSharedValue(1);
  const [setRightIcon] = useState('eye');
  const [setPasswordVisibility] = useState(true);
  const { passwordVisibility, rightIcon, handlePasswordVisibility} =
  useTogglePasswordVisibility();
  
  let validateAndSet = (value,setValue) => {
   setValue(value)
}


  const forgotPassword=()=>{
    if(email != ""){
      sendPasswordResetEmail(auth, email)
  .then(() => {
    alert("The Email has been sent")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
    }else {
      alert("Please provide Email")
    }
  }
const formButtonAnimatedStyle = useAnimatedStyle(() => {
  return {
    transform: [{scale: formButtonScale.value}]
  }
})
function checkPassword(firstpassword,secondpassword) {
  if(firstpassword !== secondpassword){
    setValidationMessage('Password do not match') 
  }
  else setValidationMessage('')
}
  async function createAccount() {
    email === '' || password === '' 
    ? setValidationMessage('required filled missing')
    : ''
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
    alert("Welcome to SchoolTime");
    navigation.navigate('DrawerNavigator');
    setEmail(null);
   // setName=="";
    setPassword(null);
    setConfirmPassword(null);
     
    }).catch ((error) =>{
      setValidationMessage(error.message);
      
    });
  }
  return (
    <View styles={{flex:1}} backgroundColor="black" height={height} width={width}>
     
    <Image source={require("../assets/Gold-Wings-Logo.png")} style={{height:100,width:100,alignSelf:'flex-start',margin:5}}></Image>
     
      <View style={{borderRadius:50,backgroundColor:'white',justifyContent:'center',height:height/1.4,margin:10,shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,}}> 
      <Text style={{ fontSize: 22, fontWeight: 'bold', marginLeft: 15, marginTop: 1, color: '#FFCC00' }}>LOGIN</Text>
    
        <Input
          placeholder='Email'
          placeholderTextColor={'black'}
          containerStyle={{marginTop: 10}}
          value={email}
          onChangeText={(text) => setEmail(text)}
         
          leftIcon={<MaterialCommunityIcons name="email-outline" size={16} color="black" />}

            />
            <View style={{flexDirection:'row'}}>
        <Input
          placeholder='Password'
          containerStyle={{marginTop:10,}}
          placeholderTextColor={'black'}
          value={password}
          onChangeText={(value) => validateAndSet(value, setPassword)}
          secureTextEntry={passwordVisibility}
          enablesReturnKeyAutomatically
          
          leftIcon={<Icon name='key' size={16} color="black"/>}
          rightIcon={<Pressable onPress={handlePasswordVisibility}>
          <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
        </Pressable>}

            />
          </View>
            <View style={{flexDirection:'row'}}>
        <Input
          placeholder='Confirm password'
          containerStyle={{marginTop:10}}
          placeholderTextColor={'black'}
          value={confirmPassword}
          onChangeText={(value) => validateAndSet(value,setConfirmPassword)}
          secureTextEntry={passwordVisibility}
         enablesReturnKeyAutomatically
         
         leftIcon={<Icon name='key' size={16} color="black"/>}
      //    rightIcon={<Pressable onPress={handlePasswordVisibility}>
      //    <MaterialCommunityIcons name={rightIcon} size={22} color="#232323" />
      //  </Pressable>
      //  }
         
          onBlur={()=>checkPassword(password,confirmPassword)}
            />
          </View>
            {<Text style={styles.error}>{validationMessage}</Text>}
        {/* <Button title="Sign up" buttonStyle={{marginTop:10}} onPress={createAccount} /> */}
        <Pressable onPress={forgotPassword} style={{alignSelf:'center',margin:10, marginTop:-45}}>
            <Text style={{fontSize:14}}>Forgot Password?</Text>
        </Pressable>
       
        <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
            <Pressable onPress={createAccount}>
              <Text style={styles.buttonText}>
               LOGIN
              </Text>
            </Pressable>
            </Animated.View>
            <Pressable onPress={()=>navigation.navigate('Register')} style={{alignContent:'center',alignSelf:'center'}}>
              <Text styles={{fontSize:16}}>
              New User Register Here
              </Text>
            </Pressable>
            </View>
     
      
    </View>
  );
}