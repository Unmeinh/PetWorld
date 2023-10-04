import { StyleSheet, StatusBar, Dimensions } from 'react-native';

let WindowWidth = Dimensions.get("window").width;
let WindowHeight = Dimensions.get("window").height;
let StatusHeight = StatusBar.currentHeight;
let yellowWhite = '#FEF6E4';
let lightBrown = '#F3D2C1';
let lighBlue = '#8BD3DD';
let pinkLotus = '#F582AE';
let darkBlue = '#001858';

export default StyleSheet.create({
    toastContainer: {
        width: '90%',
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#001858',
        elevation: 10,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        overflow: 'hidden',
    },

    viewToastType: {
        // backgroundColor: '#EAC645',
        position: 'absolute',
        left: 0,
        height: 60,
        width: 70,
    },

    circleToastType: {
        height: 140, 
        width: 140,
        borderRadius: 70,
        top: -30,
        left: -30,
    },

    toastText: {
        fontSize: 15,
        fontWeight: '400',
        color: '#001858',
        left: 7,
        width: '85%',
    },

    toastButtonText: {
        fontSize: 13.5,
        fontWeight: '500',
        color: '#001858',
        marginLeft: 10
    }
});
