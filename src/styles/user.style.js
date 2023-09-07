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
    viewContainer: {
        backgroundColor: yellowWhite,
        flex: 1
    },

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
    },

    //Page
    containerPage: {
        flex: 1,
        backgroundColor: yellowWhite,
    },

    headerPage: {
        backgroundColor: yellowWhite,
        shadowColor: "#000",
        elevation: 5,
    },

    headerCollapse: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 13,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: yellowWhite,
        width: '100%',
        position: 'absolute',
        zIndex: 100
    },

    headerExtend: {
        paddingLeft: 25,
        paddingRight: 15,
        marginTop: 2,
        backgroundColor: yellowWhite
    },

    pageUserAvatar: {
        width: 85, height: 85,
        borderRadius: 50
    },

    pageTextName: {
        width: WindowWidth - 145,
        fontSize: 20,
        color: darkBlue,
        fontFamily: 'ProductSans',
        fontWeight: 'bold',
    },

    viewButtonHeader: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        flexDirection: 'row'
    },

    buttonHeader: {
        paddingHorizontal: 13,
        paddingVertical: 6,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: 'rgba(0, 24, 88, 0.55)',
        marginLeft: 10,
        backgroundColor: yellowWhite,
        shadowColor: "#000",
        elevation: 9,
    },

    textButtonHeader: {
        fontSize: 11,
        color: darkBlue,
        fontFamily: 'ProductSans',
        fontWeight: 'bold',
    },

    viewRowAroundPage: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: 20,
        marginTop: 15
    },

    textCountPage: {
        color: darkBlue,
        fontSize: 18,
        fontWeight: '700',
        fontFamily: 'ProductSans',
    },

    detailCountPage: {
        color: 'rgba(0, 0, 0, 0.65)',
        fontSize: 11,
        fontFamily: 'ProductSans',
    },

    textDescPage: {
        width: '100%',
        color: darkBlue,
        fontSize: 14,
        fontFamily: 'ProductSans',
        marginVertical: 15,
        paddingHorizontal: 20,
        textAlign: 'left'
    },

    textTabBar: {
        fontSize: 16,
        fontFamily: 'ProductSans',
    },

    //Item User Follow
    followerTextName: {
        width: WindowWidth - 90,
        fontSize: 17,
        color: darkBlue,
        fontFamily: 'ProductSans',
        fontWeight: '700',
    },

    textFollowerLocation: {
        color: 'rgba(0, 0, 0, 0.70)',
        marginLeft: 7,
        marginTop: 4,
        fontFamily: 'ProductSans',
        fontSize: 13,
        width: WindowWidth - 235,
    },

    buttonFollow: {
        paddingHorizontal: 11,
        paddingVertical: 5,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: 'rgba(0, 24, 88, 0.55)',
        marginLeft: 10,
        backgroundColor: yellowWhite,
        shadowColor: "#000",
        elevation: 9,
    },

    //Item Manager
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
        marginLeft: 8
    },

    //Edit Info
    itemEditInfo: {
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5
    },

    titleItemEdit: {
        color: '#000',
        fontSize: 20,
        fontFamily: 'ProductSans'
    },

    textItemEdit: {
        color: 'rgba(0, 0, 0, 0.70)',
        fontSize: 15,
        fontFamily: 'ProductSans',
        marginTop: 3,
    },

    inputEdit: {
        color: '#000',
        padding: 0,
        width: '95%',
        fontSize: 15,
        marginTop: 3,
        paddingHorizontal: 13,
        borderWidth: 1,
        borderTopColor: yellowWhite,
        borderLeftColor: yellowWhite,
        borderRightColor: yellowWhite,
        borderBottomColor: 'rgba(0, 0, 0, 0.50)',
        borderRadius: 15,
    },

    buttonSave: {
        paddingHorizontal: 15,
        paddingVertical: 5.5,
        borderRadius: 10,
        marginLeft: 10,
        shadowColor: "#000",
        elevation: 9,
    },
});
