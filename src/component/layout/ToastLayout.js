import Toast, { BaseToast, SuccessToast, ErrorToast } from 'react-native-toast-message';
import {View, Text} from 'react-native';
let yellowWhite = '#FEF6E4';
let lightBrown = '#F3D2C1';
let lighBlue = '#8BD3DD';
let pinkLotus = '#F582AE';
let darkBlue = '#001858';

const toastConfig = {
    success: (props) => (
        <SuccessToast
            {...props}
            style={{ borderLeftColor: '#4ACC10', borderLeftWidth: 7 }}
            contentContainerStyle={{ shadowColor: '#001858', elevation: 10, backgroundColor: '#fff', borderTopRightRadius: 5, borderBottomRightRadius: 5 }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400',
                color: '#001858',
                left: -10
            }}
        />
    ),

    error: (props) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: '#FF312E', borderLeftWidth: 7 }}
            contentContainerStyle={{ shadowColor: '#001858', elevation: 10, backgroundColor: '#fff', borderTopRightRadius: 5, borderBottomRightRadius: 5 }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400',
                color: '#001858',
                left: -10
            }}
        />
    ),

    loading: (props) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: '#FFDA47', borderLeftWidth: 7 }}
            contentContainerStyle={{ shadowColor: '#001858', elevation: 10, backgroundColor: '#fff', borderTopRightRadius: 5, borderBottomRightRadius: 5 }}
            text1Style={{
                fontSize: 15,
                fontWeight: '400',
                color: '#001858',
                left: -10
            }}
        />
    ),

    tomatoToast: ({ text1, props }) => (
        <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
            <Text>{text1}</Text>
            <Text>{props.uuid}</Text>
        </View>
    )
};

export function ToastLayout(props) {
    return (
        <>
            <Toast config={toastConfig} />
        </>
    );
}