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
        width: "100%",
        justifyContent: 'flex-end',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    }, 

    viewDialog: {
        width: "100%",
        height: WindowHeight - 25,
        backgroundColor: '#F2F2F2',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    
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
});
