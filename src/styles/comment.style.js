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
    backgroundModal: {
        flex: 1,
        width: WindowWidth,
        height: WindowHeight,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },

    viewDialog: {
        width: "100%",
        height: WindowHeight - 20,
        backgroundColor: '#F2F2F2',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        position: 'absolute',
        left: -20, top: 0
    },

    viewTop: {
        height: WindowHeight - 140,
    },

    viewInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#F2F2F2',
        shadowColor: '#000',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        elevation: 3
    },

    textName: {
        fontSize: 17,
        fontFamily: 'ProductSans',
        color: darkBlue,
        fontWeight: 'bold'
    },

    imageAvatar: {
        height: 45, width: 45,
        borderRadius: 45 / 2,
        marginRight: 15,
    },

    textFollow: {
        fontSize: 17,
        fontFamily: 'ProductSans',
        color: '#006CFB',
    },

    textUnFollow: {
        fontSize: 17,
        fontFamily: 'ProductSans',
        color: '#f00',
    },

    //Comment Item
    viewComment: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingTop: 10, marginBottom: 10
    },

    avatarComment: {
        height: 40, width: 40,
        borderRadius: 40 / 2,
        marginRight: 10,
    },

    viewContent: {
        width: WindowWidth - 80,
    },

    contentComment: {
        fontSize: 15,
        fontFamily: 'ProductSans',
        color: darkBlue,
        marginBottom: 7
    },
    
    viewRowInteract: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginRight: 15,
    },

    iconInteractComment: {
        height: 17,
        alignItems: 'center',
        alignContent: 'center'
    },

    textInteractComment: {
        fontSize: 13,
        fontFamily: 'ProductSans',
        color: 'rgba(0, 0, 0, 0.65)',
        marginLeft: 7
    },

    //Write comment
    viewWriteComment: {
        position: 'absolute',
        bottom: -20,
        left: -20,
        width: WindowWidth,
        backgroundColor: '#F2F2F2',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderTopColor: 'rgba(0, 0, 0, 0.20)',
        borderTopWidth: 1.2
    },

    viewTopWriteComment: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    
    iconInteract: {
        height: 30,
        alignItems: 'center',
        alignContent: 'center'
    },

    textInteract: {
        fontSize: 15,
        fontFamily: 'ProductSans',
        color: darkBlue,
    },

    inputComment: {
        backgroundColor: '#E6E6E6',
        width: WindowWidth - 80,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        fontSize: 15,
        fontFamily: 'ProductSans',
        color: darkBlue
    },

    buttonSend: {
        backgroundColor: lighBlue,
        height: 33, width: 33,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
