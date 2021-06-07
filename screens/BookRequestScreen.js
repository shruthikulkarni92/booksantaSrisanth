import * as React from 'react';
import {View,Text,TextInput,StyleSheet,TouchableOpacity,Alert,Image,Modal,ScrollView,KeyboardAvoidingView} from 'react-native';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/MyHeader';
import {SafeAreaProvider} from 'react-native-safe-area-context'

export default class BookRequestScreen extends React.Component{
    constructor(){
        super();
        this.state={
            userId:firebase.auth().currentUser.email,
            bookName:'',
            reasonToRequest:''
        }
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7)
    }

    addRequest=(bookName,reasonToRequest)=>{
        var userId = this.state.userId;
        var randomRequestId = this.createUniqueId();
        db.collection('requestedBooks').add({
            user_id:userId,
            book_name:bookName,
            reason:reasonToRequest,
            request_id:randomRequestId
        })
        this.setState({
            bookName:'',
            reasonToRequest:''
        })
        return Alert.alert("Book request successful")
    }
    render(){
        return(
            <SafeAreaProvider>
                <View style={{flex:1}}>
                    <MyHeader title="Request Book"/>
                    <KeyboardAvoidingView>
                        <TextInput
                        style={styles.inputBox}
                        placeholder={'Enter Book Name'}
                        onChangeText={text=>{
                            this.setState({
                                bookName:text
                            })
                            }}
                        value={this.state.bookName}
                        />
                        <TextInput
                        style={styles.inputBox}
                        placeholder={'Why did you request the book?'}
                        onChangeText={text=>{
                            this.setState({
                                reasonToRequest:text
                            })
                            }}
                        value={this.state.reasonToRequest}
                        />
                        <TouchableOpacity
                        onPress={()=>{this.addRequest(this.state.bookName,this.state.reasonToRequest)}}
                        style={styles.requestButton}>
                            <Text>Request</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                
                </View>
            </SafeAreaProvider>
        )
    }
}
const styles= StyleSheet.create({
    inputBox:{
        width:'75%',
        height:40,
        alignSelf:'center',
        justifyContent:'center',
        borderWidth:2,
        borderColor:'red',
        borderRadius:10,
        marginTop:20,
        padding:10
    },
    requestButton:{
        width:'60%',
        height:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'red',
        alignSelf:'center',
        marginTop:20
    }
})