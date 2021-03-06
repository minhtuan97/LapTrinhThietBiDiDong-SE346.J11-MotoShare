import update from "react-addons-update";
import constants from "./actionConstants";
import {Dimensions} from "react-native";
import request from "../../../util/request";
import {myLocalHost} from "../../../util/serverConnection";


//--------------------
//Constants
//--------------------
const { 
    SET_NAME,
    GET_EMAIL,
    CHANGE_PASSWORD
} = constants;

const { width, height } = Dimensions.get("window");


//--------------------
//Variables
//--------------------



//--------------------
//Actions
//--------------------
export function setName(){
    return{
        type:SET_NAME,
        payload:"BDtren"
    }
}

//get Email info
export function getEmail(email){
	return(dispatch, store)=>{
		if(!email||email.indexOf("@")<1) return;
		request.get("http://"+myLocalHost+"/api/userEmail")
		.query({
			email:email
		})
		.finish((error, res)=>{
			res&&
				dispatch({
					type:GET_EMAIL,
					payload: res.body
				});
			error&& console.log(error);
		});	
	};
}

//Update password
export function setPassword(email, password){
	return(dispatch, store)=>{
		if(!email||!password) return;
		request.put("http://"+myLocalHost+"/api/userEmail")
		.query({
			email:email,
			password:password
		})
		.finish((error, res)=>{
			res&&
				dispatch({
					type:CHANGE_PASSWORD,
					payload: res.body
				});
			error&& console.log(error);
		});	
	};
}

//--------------------
//Action Handlers
//--------------------
function handleSetName(state, action){
    return update(state,{
        name:{
            $set:action.payload
        }
    })
}

function handleGetEmail(state, action){
    return update(state,{
        hasEmailAccount:{
            $set:action.payload
        }
    })
}

function handleSetPassword(state, action){
    return update(state,{
        changedAccount:{
            $set:action.payload
        }
    })
}


const ACTION_HANDLERS = {
    SET_NAME:handleSetName,
    GET_EMAIL:handleGetEmail,
    CHANGE_PASSWORD:handleSetPassword
}
const initialState = {
    name:{},
    hasEmailAccount:{}
	
};

export function ForgetPasswordReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
