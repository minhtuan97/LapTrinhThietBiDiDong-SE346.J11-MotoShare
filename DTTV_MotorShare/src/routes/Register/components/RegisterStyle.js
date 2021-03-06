import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    line:{
        width: 100+"%",
        borderBottomColor: '#2699FB',
        borderBottomWidth: 1,
        marginTop: 16
    },
    avatarChosen:{
        width: 100+"%",
        height: 20+"%",
        alignItems: 'center',
        marginTop: 2+"%"
    },
    InputTextSection:{
        marginTop: 6+"%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionButton: {
        marginTop: 10+"%", width: 100+"%", height: 10+"%", alignItems: 'center'
    },
    customButtonStyle:{
        width: 310, height: 46, backgroundColor: '#2C83DB', justifyContent: 'center', alignItems: 'center', borderRadius: 5
    },
    avatarStyle:{
        width: 100, height: 100, borderRadius: 50, marginTop: 5+"%"
    },

});

export default styles;