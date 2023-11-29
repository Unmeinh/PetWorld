import { StyleSheet, StatusBar, Dimensions } from 'react-native';
export let WindowWidth = Dimensions.get("window").width;
export let WindowHeight = Dimensions.get("window").height;
let StatusHeight = StatusBar.currentHeight;
export let yellowWhite = '#FEF6E4';
export let lightBrown = '#F3D2C1';
export let lighBlue = '#8BD3DD';
export let pinkLotus = '#F582AE';
export let darkBlue = '#001858';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: yellowWhite
    },

    textYellowWhite: {
        fontFamily: 'ProductSans',
        color: yellowWhite,
    },

    textLightBrown: {
        fontFamily: 'ProductSans',
        color: lightBrown
    },

    textLighBlue: {
        fontFamily: 'ProductSans',
        color: lighBlue
    },

    textPinkLotus: {
        fontFamily: 'ProductSans',
        color: pinkLotus
    },

    textDarkBlue: {
        fontFamily: 'ProductSans',
        color: darkBlue
    },

    bgYellowWhite: {
        backgroundColor: yellowWhite
    },

    bgLightBrown: {
        backgroundColor: lightBrown
    },

    bgLighBlue: {
        backgroundColor: lighBlue
    },

    bgPinkLotus: {
        backgroundColor: pinkLotus
    },

    bgDarkBlue: {
        backgroundColor: darkBlue
    },

    positionAbsolute: {
        position: 'absolute'
    },

    statusHeight: {
        height: StatusHeight
    },

    windowWidth: {
        width: WindowWidth,
    },

    windowHeight: {
        height: WindowHeight,
    },

    justifyCenter: {
        justifyContent: 'center'
    },

    justifyAround: {
        justifyContent: 'space-around'
    },

    justifyBetween: {
        justifyContent: 'space-between'
    },

    justifyEvenly: {
        justifyContent: 'space-evenly'
    },

    justifyFlexstart: {
        justifyContent: 'flex-start'
    },

    justifyFlexend: {
        justifyContent: 'flex-end'
    },

    itemsCenter: {
        alignItems: 'center'
    },

    itemsFlexStart: {
        alignItems: 'flex-start'
    },

    itemsFlexEnd: {
        alignItems: 'flex-end'
    },

    flexRow: {
        flexDirection: 'row'
    },

    bgHeaderAccount: {
        height: '15%', width: WindowWidth,
        borderBottomLeftRadius: WindowWidth * 10 / 100,
        borderBottomRightRadius: WindowWidth * 10 / 100,
    },

    viewHeaderAccount: {
        height: WindowHeight * 17.5 / 100, width: '90%',
        borderRadius: WindowWidth * 5 / 100,
        top: WindowHeight * 6.5 / 100,
        left: WindowWidth * 5 / 100,
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    avatarHeaderAccount: {
        height: WindowHeight * 9 / 100,
        width: WindowHeight * 9 / 100,
        borderRadius: WindowHeight * 9 / 100,
    },

    viewDetailHeaderAccount: {
        width: "48%",
        borderRadius: 5,
        paddingHorizontal: 5
    },

    viewContainerAccount: {
        marginTop: '20%',
        paddingHorizontal: 15
    },

    viewItemBill: {
        width: WindowWidth * 15 / 100,
        height: WindowWidth * 15 / 100,
        borderRadius: 15,
        backgroundColor: '#F582AE26',
        marginBottom: 5
    },

    viewItemManager: {
        flexDirection: 'row',
        width: WindowWidth,
        marginTop: 3,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomColor: '#D9D9D9',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    itemManager: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: WindowWidth - 85
    },

    buttonChangeImage: {
        position: 'absolute',
        right: 9, bottom: 5,
        backgroundColor: '#656565',
        padding: 3,
        borderRadius: 25,
    },

    titleItemManager: {
        color: '#001858',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'ProductSans'
    },

    textItemManager: {
        color: '#001858',
        fontSize: 14,
        fontFamily: 'ProductSans',
        marginLeft: 8,
    },

    itemEditInfo: {
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5
    },

    titleItemEditInfo: {
        color: '#000',
        fontSize: 19,
        fontFamily: 'ProductSans'
    },

    titleItemVerify: {
        position: 'absolute',
        left: 0, bottom: -2,
        flexDirection: 'row',
        alignItems: 'center'
    },

    textItemEditInfo: {
        color: 'rgba(0, 0, 0, 0.60)',
        fontSize: 17,
        fontFamily: 'ProductSans',
        marginTop: 5,
    },

    inputEditInfo: {
        color: darkBlue,
        fontSize: 17,
        padding: 0,
        width: '95%',
        marginTop: 3,
        paddingVertical: 5,
        paddingHorizontal: 13,
        borderWidth: 1,
        borderTopColor: yellowWhite,
        borderLeftColor: yellowWhite,
        borderRightColor: yellowWhite,
        borderBottomColor: 'rgba(0, 0, 0, 0.50)',
        borderRadius: 15,
        fontFamily: 'ProductSans',
    },

    togglePassword: {
        position: 'absolute',
        right: 10, top: '35%'
    },

    buttonFormSmall: {
        paddingHorizontal: 15,
        paddingVertical: 5.5,
        borderRadius: 10,
        marginLeft: 10,
        shadowColor: "#000",
        elevation: 9,
    },

    textButtonFormSmall: {
        color: yellowWhite,
        marginLeft: 2,
        fontSize: 11,
        fontWeight: 'bold',
        fontFamily: 'ProductSans',
    },

    buttonEditAccount: {
        backgroundColor: lightBrown,
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 10,
        borderWidth: 1.5,
        marginLeft: 10,
        marginTop: 13,
        shadowColor: "#000",
        elevation: 5,
        alignItems: 'center',
    },

    inputPhoneEditInfo: {
        flexDirection: 'row',
        backgroundColor: yellowWhite,
        width: WindowWidth - 70,
        overflow: 'hidden',
        marginTop: 13,
        borderWidth: 1,
        borderTopColor: yellowWhite,
        borderLeftColor: yellowWhite,
        borderRightColor: yellowWhite,
        borderBottomColor: 'rgba(0, 0, 0, 0.50)',
        borderRadius: 15,
    },

    inputPhoneCountryInfo: {
        color: darkBlue,
        fontSize: 17,
        fontFamily: 'ProductSans',
        backgroundColor: yellowWhite,
        width: 68,
        paddingLeft: 15,
        paddingHorizontal: 0,
        paddingVertical: 5,
        borderRightColor: darkBlue,
        borderRightWidth: 1
    },

    inputPhoneValueInfo: {
        color: darkBlue,
        width: (WindowWidth - 70) - 68,
        fontSize: 17,
        padding: 0,
        paddingLeft: 5,
        paddingRight: 13,
        fontFamily: 'ProductSans',
    },

    dropdownSelect: {
        position: 'absolute',
        top: '35%', left: 5
    },

});
