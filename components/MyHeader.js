import React from 'react';
import {Header} from 'react-native-elements';

const MyHeader = props =>{
    return(
        <Header
        centerComponent={{text:props.title,style:{color:'lime',fontSize:25,fontWeight:'bold'}}}
        backgroundColor='black'/>
    )
}

export default MyHeader;