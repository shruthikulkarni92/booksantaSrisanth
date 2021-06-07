import * as React from 'react';
import {View,Text,TextInput,StyleSheet,TouchableOpacity,Alert,Image,Modal,ScrollView,KeyboardAvoidingView} from 'react-native'
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            emailId:'',
            password:'',
            isModalVisible:'false',
            firstName:'',
            lastName:'',
            address:'',
            contact:'',
            confirmPassword:''
        }
    }

    showModal=()=>{
        return(
            <Modal
            animationType='fade'
            transparent={true}
            visible={this.state.isModalVisible}>
                <View style={styles.modalContainer}>
                    <ScrollView>
                        <KeyboardAvoidingView>
                            <Text style={styles.modalTitle}>REGISTRATION</Text>
                            <TextInput
                            style={styles.formTextInput}
                            placeholder={"First Name"}
                            maxLength={8}
                            onChangeText={text=>{
                                this.setState({firstName:text})
                            }}/>
                            <TextInput
                            style={styles.formTextInput}
                            placeholder={"Last Name"}
                            maxLength={8}
                            onChangeText={text=>{
                                this.setState({lastName:text})
                            }}/>
                            <TextInput
                            style={styles.formTextInput}
                            placeholder={"Contact"}
                            maxLength={10}
                            keyboardType={'numeric'}
                            onChangeText={text=>{
                                this.setState({contact:text})
                            }}/>
                            <TextInput
                            style={styles.formTextInput}
                            placeholder={"Address"}
                            multiline={true}
                            onChangeText={text=>{
                                this.setState({address:text})
                            }}/>
                            <TextInput
                            style={styles.formTextInput}
                            placeholder={"Email ID"}
                            keyboardType={'email-address'}
                            onChangeText={text=>{
                                this.setState({emailId:text})
                            }}/>
                            <TextInput
                            style={styles.formTextInput}
                            placeholder={"Password"}
                            secureTextEntry={true}
                            onChangeText={text=>{
                                this.setState({password:text})
                            }}/>
                            <TextInput
                            style={styles.formTextInput}
                            placeholder={"Confirm Password"}
                            secureTextEntry={true}
                            onChangeText={text=>{
                                this.setState({confirmPassword:text})
                            }}/>
                            <View>
                                <TouchableOpacity
                                style={styles.registerButton}
                                onPress={()=>{this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)}}>
                                    <Text style={styles.registerButtonText}>REGISTER</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={()=>this.setState({'isModalVisible':false})}>
                                    <Text>CANCEL</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    userSignUp=(emailId,password,confirmPassword)=>{
        if(password!==confirmPassword){
            Alert.alert("Password doesn't match\n CHeck your password")
        }
        else{
            firebase.auth().createUserWithEmailAndPassword(emailId,password)
            .then(()=>{
                db.collection('users').add({
                    first_Name:this.state.firstName,
                    last_Name:this.state.lastName,
                    contact:this.state.contact,
                    address:this.state.address,
                    email_Id:this.state.emailId
                })
                return Alert.alert("User added successfully",
                '',
                [
                    {text:'OK',onPress:()=>{this.setState({'isModalVisible':false})}}
                ])
            })
            .catch((error)=>{
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
            })
        }
    }

    userLogin=(emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password)
        .then(()=>{
            this.props.navigation.navigate("Donate")

        })
        .catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
        })
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{justifyContent:'center',alignItems:'center'}}> 
                    {this.showModal()}
                </View>
                <Image 
                style={{width:500,height:500,marginLeft:80}}
                source={require('../assets/santa.jpg')}/>
                <View>
                    <Text style={styles.title}>BOOK SANTA APP</Text>
                </View>

                <View>
                    <TextInput
                    style={styles.loginBox}
                    placeholder="xyz@example.com"
                    keyboardType='email-address'
                    onChangeText={text=>{
                        this.setState({emailId:text})
                    }}
                    />

                    <TextInput
                    style={styles.loginBox}
                    placeholder="enter your password"
                    secureTextEntry={true}
                    onChangeText={text=>{
                        this.setState({password:text})
                    }}
                    />

                    <TouchableOpacity 
                    style={[styles.button,{marginBottom:20,marginTop:20}]}
                    onPress={()=>{this.userLogin(this.state.emailId,this.state.password)}}>
                        <Text style={styles.buttonText}> LOGIN </Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.button}
                    onPress={()=>this.setState({ 'isModalVisible':true})}>
                        <Text style={styles.buttonText}> SIGN UP </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'skyblue',
        justifyContent:'center',
        alignItems:'center'
    },
    title:{
        fontSize:50,
        fonxtWeight:'bold',
        color:'red'
    },
    loginBox:{
        width:300,
        height:50,
        borderWidth:2,
        borderColor:'blue',
        fontSize:20,
        margin:10
    },
    button:{
        width:300,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'red',
        borderRadius:50
    },
    buttonText:{
        fontSize:20,
        color:'black',
        fontWeight:'bold'
    },
    modalTitle :{
        justifyContent:'center',
        alignSelf:'center',
        fontSize:30,
        color:'purple',
        margin:50
      },
    modalContainer:{
        flex:1,
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"pink",
        marginRight:30,
        marginLeft : 30,
        marginTop:80,
        marginBottom:80,
    },
    formTextInput:{
        width:"75%",
        height:35,
        alignSelf:'center',
        borderColor:'yellow',
        borderRadius:10,
        borderWidth:1,
        marginTop:20,
        padding:10
      },
      cancelButton:{
        width:200,
        height:30,
        justifyContent:'center',
        alignItems:'center',
        marginTop:5,
        borderWidth:1,
        borderRadius:10,
      },
      registerButton:{
        width:200,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        borderWidth:1,
        borderRadius:10,
        marginTop:30
      },
      registerButtonText:{
        color:'cyan',
        fontSize:15,
        fontWeight:'bold'
      },

})