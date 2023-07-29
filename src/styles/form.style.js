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
        flex: 1,
        backgroundColor: yellowWhite,
        paddingLeft: 30,
        paddingRight: 30
    },

    pawBottomLeft: {
        position: 'absolute',
        top: WindowHeight - 87
    },

    pawBottomRight: {
        position: 'absolute',
        top: WindowHeight - 107,
        right: 0
    },

    slash: {
        color: darkBlue,
        fontSize: 40,
        fontFamily: 'ProductSans',
        marginLeft: 3, marginRight: 3
    },

    textEnable: {
        color: darkBlue,
        fontSize: 27,
        fontWeight: 'bold',
        fontFamily: 'ProductSans',
    },

    textDisable: {
        color: 'rgba(0, 24, 88, 0.35)',
        fontSize: 27,
        fontWeight: 'bold',
        fontFamily: 'ProductSans',
    },

    textLeftGreetingLI: {
        color: pinkLotus,
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'ProductSans',
    },

    textLeftGreetingSI: {
        color: '#00A4BB',
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'ProductSans',
    },

    textRightGreeting: {
        color: 'rgba(0, 24, 88, 0.80)',
        fontSize: 20,
        fontWeight: '500',
        fontFamily: 'ProductSans',
    },

    titleInput: {
        fontSize: 15,
        fontFamily: 'ProductSans',
        marginTop: 15
    },

    plusTextInput: {
        color: '#001858',
        fontSize: 17,
        fontFamily: 'ProductSans',
        position: 'absolute',
        top: '35%', left: 10
    },

    textInput: {
        marginTop: 7,
        color: darkBlue,
        fontSize: 17,
        fontFamily: 'ProductSans',
        backgroundColor: lightBrown,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.50)',
        paddingLeft: 15, paddingRight: 15,
        paddingTop: 9, paddingBottom: 9,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    textInputSelect: {
        marginTop: 7,
        marginLeft: 15,
        width: WindowWidth - 100,
        color: darkBlue,
        fontSize: 17,
        fontFamily: 'ProductSans',
        backgroundColor: lightBrown,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.50)',
        paddingLeft: 20, paddingRight: 15,
        paddingTop: 9, paddingBottom: 9,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    textInputPass: {
        marginTop: 7,
        color: darkBlue,
        fontSize: 17,
        fontFamily: 'ProductSans',
        backgroundColor: lightBrown,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.50)',
        paddingLeft: 15, paddingRight: 45,
        paddingTop: 9, paddingBottom: 9,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    togglePassword: {
        position: 'absolute',
        right: 10, top: '30%'
    },

    checkboxRM: {
        marginTop: 15, marginRight: 5
    },

    buttonConfirm: {
        marginTop: 25,
        width: '100%',
        borderRadius: 10,
        backgroundColor: pinkLotus,
        alignItems: 'center',
        padding: 12,
        elevation: 10,
        shadowColor: "#000000",
    },

    textButtonConfirm: {
        color: yellowWhite,
        fontSize: 23,
        fontWeight: 'bold',
        fontFamily: 'ProductSans',
    },

    viewContinue: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 40
    },

    textContinue: {
        fontSize: 18,
        color: darkBlue,
        fontFamily: 'ProductSans',
    },

    barContinue: {
        width: '27%',
        height: 3,
    },

    borderIcon: {
        padding: 9,
        borderColor: lighBlue,
        borderWidth: 1,
        borderRadius: 30,
    },

    titleLarge: {
        fontSize: 27,
        fontWeight: '700',
        color: darkBlue,
        fontFamily: 'ProductSans',
        marginTop: 5
    },

    textDetail: {
        fontSize: 17,
        color: 'rgba(0, 24, 88, 0.69)',
        fontFamily: 'ProductSans',
        margin: 10
    },

    textDetailRed: {
        fontSize: 17,
        fontFamily: 'ProductSans',
        margin: 10,
        color: '#EB4335',
        marginLeft: 0,
        fontWeight: '700'
    },

    isSelectOption: {
        position: 'absolute',
        top: 7, left: 8
    },

    inputOTP: {
        fontSize: 35,
        fontFamily: 'ProductSans',
        color: darkBlue,
        fontWeight: '700',
        letterSpacing: 35,
        width: '100%',
    },

    underlineOTP: {
        backgroundColor: '#000',
        height: 1, width: '13.5%'
    }
});
