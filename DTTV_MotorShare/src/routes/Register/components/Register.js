import React, {Component} from 'react'
import {View, Text, StyleSheet, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, BackHandler} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Actions } from "react-native-router-flux";
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from "moment";
import styles from './RegisterStyle';


const { width,height } = Dimensions.get("window");

class ButtonCustom extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        BackHandler.addEventListener('hardwareBackPress', function(){console.log("Register: press");
            Actions.login({ type: "reset" });
            return true;
        });
    }
    componentWillUnMount() {
        BackHandler.removeEventListener('hardwareBackPress', function(){console.log("Register:delete press");
            return true;
        });
      }

    render(){
        return(
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={[styles.customButtonStyle, this.props.styleBtn]}>
                    <Text  style={{fontSize: 16, color: '#ffffff'}}>Tạo</Text>
                </View>
            </TouchableOpacity>
        )
    }
}


class CustomeInputText extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={[{width: 327, height: 34}, this.props.styleInput]}>
                <View style={{width: 100+"%", height: 16, flexDirection: 'row'}}>
                    <Icon name={this.props.IconName} size={16} color="#2699FB" />
                    <TextInput secureTextEntry={this.props.secure}   placeholder={this.props.placeholder} 
                    placeholderTextColor={"#2699FB"} onChangeText={this.props.onChangeText}
                    style={{width: 250, height: 16, fontSize: 14, marginLeft: 20, paddingVertical: 0, paddingHorizontal: 0, color:'#2699FB'}}/>
                </View>
                <View
                    style={styles.line}
                />
            </View>
        )
    }
}

class CustomeDatePicker extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <TouchableOpacity onPress={this.props.onPress}>
                <View style={[{width: 327, height: 36}, this.props.styleInput]}>
                    <View style={{width: 100+"%", height: 18, flexDirection: 'row'}}>
                        <Icon name={this.props.IconName} size={16} color={'#2699FB'} />
                        <Text style={{fontSize: 14, marginLeft: 20, color: '#2699FB'}}>{this.props.NS}</Text>
                    </View>
                    <View
                        style={styles.line}
                    />
                </View>
            </TouchableOpacity>
        )
    }
}


export default class Register extends Component{
    constructor(props) {
        super(props);
    }

    state={
        showAvatarPick:false,
        visible: false,

        name: "",
        dob: "Ngày Sinh",
        phoneNumber: "",
        rating: "5",
        dCreate: new Date(),
        profilePic: null,
        account: {
            userName: "",
            password: "",
            password2: ""
        }
    }

    render(){
        return(
            <View style={{flex:1}}>
                <DateTimePicker
                    isVisible={this.state.visible}
                    onConfirm={this.handlePicker}
                    onCancel={this.hidePicker}
                    mode={'date'}
                    is24Hour={true}
                />

                <View style={styles.avatarChosen}>
                    
                    <TouchableOpacity onPress={()=>{this.setState({showAvatarPick:true})}}>
                        <Image source={this.state.profilePic&&{uri:this.state.profilePic}||require('../../../assets/image/user-default.png')} style={styles.avatarStyle} />
                    </TouchableOpacity>
                                 
                </View>

                <KeyboardAvoidingView enabled behavior={'padding'}>
                    <View style={{width: 100+"%", height: 80+"%"}}>
                        <View style={styles.InputTextSection}>
                            <CustomeInputText placeholder={"Tên"} IconName={"user-circle"} onChangeText={(name)=>this.setState({ name: name })}/>
                        </View>
                        <View style={styles.InputTextSection}>
                            <CustomeDatePicker NS={this.state.dob} IconName={"calendar"} onPress={()=>this.showPicker()}/>
                        </View>
                        <View style={styles.InputTextSection}>
                            <CustomeInputText placeholder={"Số điện thoại"} IconName={"phone"} onChangeText={(ph)=>this.setState({ phoneNumber: ph })}/>
                        </View>
                        <View style={styles.InputTextSection}>
                            <CustomeInputText placeholder={"tên tài khoản"} IconName={"user-plus"} onChangeText={(uname)=>this.setState({ account:{userName: uname} })}/>
                        </View>
                        <View style={styles.InputTextSection}>
                            <CustomeInputText placeholder={"Mật khẩu"} secure={true} IconName={"lock"} onChangeText={(pwd)=>this.setState({ account:{password: pwd} })}/>
                        </View>
                        <View style={styles.InputTextSection}>
                            <CustomeInputText placeholder={"Xác nhận mật khẩu"} secure={true} IconName={"lock"} onChangeText={(pwd)=>this.setState({ account:{password2: pwd} })}/>
                        </View>
                        <View style={styles.sectionButton}>
                            <ButtonCustom onPress={()=>{if(this.state.name==""|| this.state.dob=="Ngày Sinh"|| this.state.phoneNumber==""||
                                            this.state.account.userName==""|| this.state.account.password ==""
                                            ||this.state.account.password!=this.state.account.password) return;
                                            this.props.createAccount(this.state.name, this.state.dob, this.state.phoneNumber, this.state.dCreate,
                                                this.state.profilePic, this.state.account.userName, this.state.account.password)}}/>
                            <TouchableOpacity onPress={()=>{Actions.login({type:"reset"})}}>
                                <Text>Quay lại</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </KeyboardAvoidingView>
            </View>
        )
    }

    //Date picker
    handlePicker = (datetime)=>{
        this.setState({
            visible: false,
            dob: moment(datetime).format('DD-MM-YYYY')
        })

    };

    hidePicker = ()=>{
        this.setState({
            visible: false
        })
    };

    showPicker =()=>{
        this.setState({visible: true})
    };
    //End date picker
}