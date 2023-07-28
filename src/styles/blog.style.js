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
    },

    viewNewPost: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    },

    imageAvatar: {
        height: 45, width: 45,
        borderRadius: 45 / 2,
        marginRight: 15,
    },

    textHint: {
        fontSize: 16,
        fontFamily: 'ProductSans',
        color: 'rgba(0, 0, 0, 0.6)'
    },

    viewOther: {
        flex: 1,
        alignItems: 'center',
        marginTop: 25
    },

    //Item Blog
    viewInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    },

    textName: {
        fontSize: 17,
        fontFamily: 'ProductSans',
        color: darkBlue,
        fontWeight: 'bold'
    },

    viewRowInteract: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginRight: 15,
    },
    
    viewBelowPost: {
        margin: 15,
    },

    iconInteract: {
        height: 30,
        alignItems: 'center',
        alignContent: 'center'
    },

    iconHeart: {
        position: 'absolute',
        left: 2,
        top: 2
    },

    textInteract: {
        fontSize: 17,
        fontFamily: 'ProductSans',
        color: darkBlue,
        marginLeft: 3
    },

    textContent: {
        fontSize: 16,
        fontFamily: 'ProductSans',
        color: darkBlue,
    },

    textTime: {
        fontSize: 13,
        fontFamily: 'ProductSans',
        color: 'rgba(0, 0, 0, 0.65)',
        paddingLeft: 3, paddingTop: 2
    },

    textBelowContent: {
        fontSize: 15,
        fontFamily: 'ProductSans',
        color: 'rgba(0, 0, 0, 0.50)',
    },

});
