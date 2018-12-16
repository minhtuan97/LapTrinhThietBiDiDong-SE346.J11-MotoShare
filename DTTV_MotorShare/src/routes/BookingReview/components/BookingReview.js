import React from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Button,
  BackHandler
} from "react-native";

import { Container } from "native-base";
import { Actions } from "react-native-router-flux";

import AccountStatus from "./AccountStatus";
import { createMaterialTopTabNavigator, createAppContainer } from "react-navigation";

import BookingScreen from './Profile/BookingScreen'
import DependentScreen from './Profile/DependentScreen'
import UserInfo from './Profile/UserInfo'
import HeaderStyle2 from '../../../components/HeaderComponent/HeaderStyle2'


var screenWidth = Dimensions.get("window").width; //full width
var ScreenHeight = Dimensions.get("window").height; //full height

const myLogo = require("../../../assets/img.jpg");
const carMarker = require("../../../assets/Linux-Avatar.png");

export class BookingReview extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
    var rx = this;

    BackHandler.addEventListener('hardwareBackPress', function(){console.log("BookingReview: press");
        return true;
    });
    this.props.setName();
    rx.props.getAccountInfo();
    setTimeout(function() {
    //   rx.props.getAccountInfo();
        rx.props.getBookingHistory();
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    // var rx = this;
  }

  componentWillUnMount() {
    BackHandler.removeEventListener('hardwareBackPress', function(){console.log("BookingReview:delete press");
        return true;
    });
  }

    render(){
        const AppNavigator = createMaterialTopTabNavigator({
            Booking: {screen: ()=><BookingScreen getBookingHistory={this.props.getBookingHistory} 
            bookingHistory={this.props.bookingHistory} />, navigationOptions:{tabBarLabel:'Đặt chuyến'} },
            Dependent: {screen: ()=><DependentScreen getBookingHistory={this.props.getBookingHistory} 
            bookingHistory={this.props.bookingHistory} />, navigationOptions:{tabBarLabel:'Đi nhờ'}}
            },{
            tabBarOptions: {
                style: {
                    backgroundColor: '#ffffff',
                },
                labelStyle:{
                    color: '#000000'
                },
            }
            });
            
            const AppEx = createAppContainer(AppNavigator);
        return(
            <View style={{flex:1}}>
                <View style={styles.headerStyle} >
                    <HeaderStyle2 action={()=><TouchableOpacity onPress ={()=>{Actions.home({ type: "reset" })}}></TouchableOpacity>}/>
                </View>
                <View style={styles.userInfoSection}>
                    <UserInfo accountInfo={this.props.accountInfo}/>
                </View>
                <View style={styles.listTripSection}>
                    <AppEx/>
                </View>
            </View>
        )
    }
}
// Booking: {screen: props=><BookingScreen {...props} getBookingHistory={props.getBookingHistory} data={props.bookingHistory}/>, navigationOptions:{tabBarLabel:'Đặt chuyến'} },




const styles = StyleSheet.create({
userInfoSection:{
    width: 100+"%", height: 20+"%", flexDirection: 'row'
},
listTripSection:{
    flex: 1,
},
headerStyle:{
    width: 100+"%", height:10+'%', padding:0, flexDirection: 'row'
},
});

export default BookingReview;
