import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import { onAxiosPost } from '../api/axios.function';

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
    var response = await onAxiosPost('user/sendResetPasswordEmail', { email: email }, 'json', true)
    if (response) {
        return true;
    } else {
        return false;
    }
}

async function onVerifyOTPbyEmail(email, otp) {
    var response = await onAxiosPost('user/verifyResetPasswordCode', { email: email, otp: otp }, 'json', true)
    if (response) {
        return true;
    } else {
        return false;
    }
}

export { onSendOTPbyEmail, onSendOTPbyPhoneNumber, onVerifyOTPbyEmail }