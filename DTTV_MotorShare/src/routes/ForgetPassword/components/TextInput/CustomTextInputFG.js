import React, {Component} from 'react'
import {View, Text, TextInput} from 'react-native'
import Icon from "react-native-vector-icons/FontAwesome";
import {styles} from './Styles'

export default class CustomeInputText extends Component{
    render(){
        return(
            <View style={[styles.txMain, this.props.styleInput]}>
                <View style={styles.txSection}>
                    <Icon name={this.props.IconName} size={16} color="#2699FB" />
                    <TextInput secureTextEntry={this.props.secure}
                               placeholder={this.props.placeholder}
                               placeholderTextColor={"#2699FB"}
                               style={styles.textinputStyle}/>
                </View>
                <View
                    style={styles.line}
                />
            </View>
        )
    }
}