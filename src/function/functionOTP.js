import Toast from 'react-native-toast-message';
import { axiosJSON } from '../api/axios.config';
import auth from '@react-native-firebase/auth';

async function onSendOTPbyPhoneNumber(phone) {
    Toast.show({
        type: 'loading',
        position: 'top',
        text1: "Đang gửi mã xác minh...",
        bottomOffset: 20,
        autoHide: false
    });
    const confirmation = await auth().signInWithPhoneNumber(phone);
    Toast.show({
        type: 'success',
        position: 'top',
        text1: "Gửi mã xác minh thành công.",
        bottomOffset: 20
    });
    return {
        success: true,
        confirm: confirmation
    };
}

async function onSendOTPbyEmail(email) {
    Toast.show({
        type: 'loading',
        position: 'top',
        text1: "Đang gửi mã xác minh...",
        bottomOffset: 20,
        autoHide: false
    });
    var response = await axiosJSON.post('user/sendResetPasswordEmail', { email: email })
        .catch((e) => {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: String(e.response.data.message),
                bottomOffset: 20
            });
            return false;
        });
    if (response != undefined) {
        if (response.status == 200) {
            var data = response.data;
            try {
                if (data.success) {
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: String(data.message),
                        bottomOffset: 20
                    });

                    return true;
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            var data = response.data;
            try {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: String(data.message),
                    bottomOffset: 20
                });
            } catch (error) {
                console.log(error);
            }
            return false;
        }
    }
}

async function onVerifyOTPbyEmail(email, otp) {
    var response = await axiosJSON.post('user/verifyResetPasswordCode', { email: email, otp: otp })
        .catch((e) => {
            // var data = response.data;
            Toast.show({
                type: 'error',
                position: 'top',
                text1: String(e.response.data.message),
                bottomOffset: 20
            });
            return false;
        });
    if (response != undefined) {
        if (response.status == 200) {
            var data = response.data;
            if (data.success) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Thành công',
                    bottomOffset: 20
                });
                return true;
            }
        } else {
            var data = response.data;
            try {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: String(data.message),
                    bottomOffset: 20
                });
            } catch (error) {
                console.log(error);
            }
            return false;
        }
    }
}

export { onSendOTPbyEmail, onSendOTPbyPhoneNumber, onVerifyOTPbyEmail }