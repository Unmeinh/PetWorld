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
    container: {
        backgroundColor: yellowWhite,
        flex: 1
    },
    
    viewOther: {
        flex: 1,
        alignItems: 'center',
        marginTop: 25
    },

    textHint: {
        fontSize: 16,
        fontFamily: 'ProductSans',
        color: 'rgba(0, 0, 0, 0.6)',
        marginTop: 15
    },

    //AppointmentItem
    circleLineItem: {
        height: 10,
        width: 10,
        backgroundColor: darkBlue,
        borderRadius: 15,
        position: 'absolute',
        left: -5
    },

    lineItem: {
        height: 2,
        width: 45,
        backgroundColor: darkBlue,
    },

    dateItem: {
        color: pinkLotus,
        fontFamily: 'ProductSans',
        fontSize: 14
    },

    imageItem: {
        height: 60,
        width: 60,
        borderRadius: 50,
    },

    textNamePetItem: {
        color: darkBlue,
        fontFamily: 'ProductSans',
        fontSize: 17,
        fontWeight: '700',
        width: WindowWidth - 150,
    },

    textNameShopItem: {
        width: WindowWidth - 150,
        color: 'rgba(0, 24, 88, 0.65)',
        fontFamily: 'ProductSans',
        fontSize: 14,
        marginTop: 3
    },

    viewDateItem: {
        marginVertical: 7,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    },

    textDateItem: {
        color: 'rgba(0, 24, 88, 0.55)',
        fontFamily: 'ProductSans',
        fontSize: 12,
        marginLeft: 3
    },

    buttonDetail: {
        backgroundColor: '#F3AEC8',
        borderRadius: 15,
        width: '60%',
        paddingVertical: 5,
        alignItems: 'center',
        shadowColor: '#000',
        elevation: 7
    },

    textButtonDetail: {
        color: darkBlue,
        fontFamily: 'ProductSans',
        fontSize: 15,
    },

    //Modal menu
    modalMenuContainer: {
        flex: 1,
        width: WindowWidth,
    },

    swipeControlModal: {
        width: '15%',
        height: 4,
        backgroundColor: '#C2C2C2',
        marginVertical: 3,
        borderRadius: 15
    },

    menuAppointment: {
        width: "100%",
        backgroundColor: '#F2F2F2',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        position: 'absolute',
        left: -20, bottom: -20,
        paddingVertical: 7
    },

    textOptionMenu: {
        color: darkBlue,
        fontFamily: 'ProductSans',
        fontSize: 20,
        marginVertical: 7
    },

    //Detail Appointment
    textPricePet: {
        width: WindowWidth - 143,
        color: 'rgba(0, 24, 88, 0.75)',
        fontFamily: 'ProductSans',
        fontSize: 14,
        marginTop: 3,
        marginLeft: 7
    },

    textNameShop: {
        color: darkBlue,
        fontFamily: 'ProductSans',
        fontSize: 17,
        width: WindowWidth - 200,
    },

    textLocationShop: {
        color: '#656565',
        fontFamily: 'ProductSans',
        fontSize: 12,
        width: WindowWidth - 208,
    },

    buttonItemShop: {
        borderWidth: 1,
        borderColor: pinkLotus,
        paddingVertical: 3,
        paddingHorizontal: 5,
        marginTop: 10,
        alignItems: 'center'
    },

    textButtonItemShop: {
        color: pinkLotus,
        fontFamily: 'ProductSans',
        fontSize: 13
    },

    textInfoShop: {
        fontFamily: 'ProductSans',
        fontSize: 14,
        color: '#3E3E3E'
    },

    buttonSave: {
        paddingHorizontal: 15,
        paddingVertical: 5.5,
        borderRadius: 10,
        marginLeft: 20,
        shadowColor: "#000",
        elevation: 9,
    },

    textButtonSave: {
        color: yellowWhite,
        marginLeft: 2,
        fontSize: 13,
        fontWeight: 'bold',
        fontFamily: 'ProductSans',
    },

    //Dialog set appointment
    modalDialogContainer: {
        flex: 1,
        width: WindowWidth,
        justifyContent: 'center',
        alignItems: 'center',
        left: -20,
    },

    dialogAppointment: {
        width: '75%',
        backgroundColor: '#F2F2F2',
        borderRadius: 5
    },

    titleDialogApm: {
        color: darkBlue,
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'ProductSans',
        width: '100%',
        textAlign: 'center',
        backgroundColor: '#F2F2F2',
        paddingTop: 10,
        paddingBottom: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        shadowColor: '#000',
        elevation: 3
    },

    imageItemDialog: {
        width: 55,
        height: 55,
        borderRadius: 50
    },

    textNamePetDialog: {
        color: darkBlue,
        fontFamily: 'ProductSans',
        fontSize: 15,
        fontWeight: '700',
        width: (WindowWidth * 75 / 100) - 100,
    },

    textNameShopDialog: {
        width: (WindowWidth * 75 / 100) - 100,
        color: 'rgba(0, 24, 88, 0.65)',
        fontFamily: 'ProductSans',
        fontSize: 13,
        marginTop: 3
    },

    textPriceDialog: {
        width: (WindowWidth * 75 / 100) - 30,
        color: darkBlue,
        fontFamily: 'ProductSans',
        fontSize: 14,
    },

    itemInputDialog: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },

    titleInputDialog: {
        color: darkBlue,
        fontFamily: 'ProductSans',
        fontSize: 14,
        marginTop: 9,
    },

    textInputDialog: {
        backgroundColor: lightBrown,
        height: 27,
        marginLeft: 7,
        fontSize: 14,
        paddingVertical: 0,
        paddingHorizontal: 10,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#00000080',
        marginTop: 9,
        shadowColor: '#000',
        elevation: 5,
        color: darkBlue
    },

});
