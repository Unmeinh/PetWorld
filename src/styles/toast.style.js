import { StyleSheet, StatusBar, Dimensions } from 'react-native';

export let WindowWidth = Dimensions.get("window").width;
export let WindowHeight = Dimensions.get("window").height;

export default StyleSheet.create({
    toastContainer: {
        width: '90%',
        // height: 60,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: '#001858',
        elevation: 10,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 13,
        paddingHorizontal: 10,
        alignItems: 'center',
        overflow: 'hidden',
    },

    viewToastType: {
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
