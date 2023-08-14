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
    //All
    viewRowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    //Modal 
    modalUserContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    modalUser: {
        width: '90%',
        backgroundColor: '#fff',
        padding: 15,
        alignItems: 'center',
        borderRadius: 5
    },
    
    modalUserAvatar: {
        width: 75, height: 75,
        borderRadius: 50
    },

    modalUserName: {
        color: darkBlue,
        fontSize: 17,
        fontFamily: 'ProductSans',
        fontWeight: 'bold',
        marginVertical: 7
    },

    
    buttonFLModal: {
        borderRadius: 10,
        paddingVertical: 7,
        paddingHorizontal: 13,
        marginBottom: 13,
        elevation: 10,
        shadowColor: "#000000",
    },

    textButtonFLModal: {
        color: yellowWhite,
        marginLeft: 2,
        fontSize: 11,
        fontWeight: 'bold',
        fontFamily: 'ProductSans',
    },

    viewRowAroundModal: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20
    },

    textCountModal: {
        color: darkBlue,
        fontSize: 14,
        fontWeight: '400',
        fontFamily: 'ProductSans',
    },

    detailCountModal: {
        color: 'rgba(0, 0, 0, 0.65)',
        fontSize: 10,
        fontFamily: 'ProductSans',
    },

    textDescModal: {
        width: '100%',
        color: 'rgba(0, 0, 0, 0.5)',
        fontSize: 14,
        fontFamily: 'ProductSans',
        marginTop: 15,
        marginBottom: 7,
        paddingHorizontal: 20,
        textAlign: 'left'
    },

    viewOptionModal: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
        paddingTop: 10,
        borderTopWidth: 0.5,
        borderTopColor: darkBlue
    },

    textOptionModal: {
        color: darkBlue,
        fontSize: 14,
        fontFamily: 'ProductSans',
        marginLeft: 10
    }
});
