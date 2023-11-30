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

    viewInfoHead: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        marginBottom: 3,
        backgroundColor: yellowWhite,
    },

    imageAvatar: {
        height: 40, width: 40,
        borderRadius: 45 / 2,
        marginRight: 10,
    },

    viewOther: {
        flex: 1,
        alignItems: 'center',
        marginTop: 25
    },

    textHint: {
        fontSize: 15,
        fontFamily: 'ProductSans',
        color: 'rgba(0, 0, 0, 0.6)',
        marginTop: 15
    },

    //Item Blog
    viewInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 15,
        paddingHorizontal: 15,
        paddingBottom: 15
    },

    viewBlogCollapse: {
        flexDirection: 'row',
        alignItems: "center",
        flexShrink: 1,
        width: WindowWidth
    },

    textName: {
        fontSize: 16,
        fontFamily: 'ProductSans',
        color: darkBlue,
        fontWeight: 'bold',
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
        fontSize: 15,
        color: darkBlue,
        fontFamily: 'ProductSans'
    },

    textContentCollapse: {
        fontSize: 14,
        fontFamily: 'ProductSans',
        color: '#001858A6',
    },

    textBlogger: {
        fontSize: 15,
        color: darkBlue,
        fontWeight: 'bold',
        fontFamily: 'ProductSans'
    },

    textTime: {
        fontSize: 13.5,
        fontFamily: 'ProductSans',
        color: 'rgba(0, 0, 0, 0.65)',
        paddingLeft: 3, paddingTop: 2
    },

    textBelowContent: {
        fontSize: 14.5,
        fontFamily: 'ProductSans',
        color: 'rgba(0, 0, 0, 0.50)',
    },

    //New Post
    viewRowCenter: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    viewRowCenterBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    buttonUpload: {
        padding: 5,
        paddingHorizontal: 20,
        borderRadius: 7,
        backgroundColor: pinkLotus,
    },

    textButtonUpload: {
        fontSize: 17,
        fontFamily: 'ProductSans',
        color: yellowWhite
    },

    viewContent: {
        width: '100%',
        backgroundColor: '#FEF6E4',
        minHeight: WindowHeight - (WindowHeight * 50 / 100)
    },

    textContentNewBlog: {
        width: '100%',
        marginBottom: 10,
        fontSize: 17,
        lineHeight: 22,
        paddingHorizontal: 20,
        color: darkBlue,
        fontFamily: 'ProductSans',
    },

    imageContent: {
        // flex: 1,
        // aspectRatio: 1.35,
        // resizeMode: 'contain',
        //  Cho Image bình thường, ImageBG thì để resize ra ngoài
    },

    viewButtonIC: {
        flexDirection: 'row',
        position: 'absolute',
        right: 10
    },

    buttonImageContent: {
        backgroundColor: '#fff',
        width: 27, height: 27,
        borderRadius: 30 / 2,
        borderColor: '#000',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },

    iconImageContent: {
        width: 19,
        height: 19
    },

    navBelow: {
        backgroundColor: lightBrown,
        position: 'absolute',
        top: WindowHeight - 55,
        marginTop: 5,
        width: WindowWidth,
        borderTopWidth: 1,
        borderColor: '#999898',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    lineNavBelow: {
        width: 1,
        height: '100%',
        backgroundColor: '#999898',
        position: 'absolute',
        left: WindowWidth / 2
    },

    imageInNavBelow: {
        height: 35, width: 35,
        marginRight: 15
    },

    fontInNavBelow: {
        height: 30, width: 30,
        marginRight: 15
    },

    textInNavBelow: {
        fontSize: 17,
        color: darkBlue,
        fontFamily: 'ProductSans',
        marginLeft: 5
    },

    backgroundModal: {
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },

    viewDialog: {
        width: '80%',
        height: '80%',
        backgroundColor: '#fff',
        borderRadius: 5
    },

    buttonBackDialog: {
        position: 'absolute',
        top: 15, left: 10
    },

    titleDialog: {
        fontSize: 23,
        fontWeight: '500',
        marginTop: 10,
        color: darkBlue
    },

    scrollViewDialog: {
        flex: 1,
        width: '100%',
        marginTop: 15,
    },

    viewItemFont: {
        borderColor: '#000',
        borderBottomWidth: 0.5,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    textItemFont: {
        fontSize: 19,
        color: darkBlue
    },

    //Modal more
    viewModalMore: {
        paddingHorizontal: 17,
        paddingTop: 10,
        justifyContent: 'center',
        backgroundColor: 'white',
        position: 'absolute',
        top: '15%', right: '0%',
        borderRadius: 5,
        shadowColor: "#000",
        elevation: 10,
    },

    viewModalItemMore: {
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        elevation: 10,
    },

    textModalItem: {
        color: 'rgba(0, 0, 0, 0.75)',
        fontFamily: 'ProductSans',
        fontSize: 15,
        alignItems: 'center',
    }
});
