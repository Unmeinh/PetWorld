import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import { onAxiosPost, onDismissKeyboard } from '../api/axios.function';

async function onSendOTPbyPhoneNumber(phone) {
    try {
        onDismissKeyboard();
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
    } catch (error) {
        console.log(error);
        if (String(error).indexOf('[auth/invalid-phone-number]') >= 0) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: "Số điện thoại không hợp lệ!\nKhông thể tìm thấy số điện thoại để xác minh!",
                bottomOffset: 20
            });
        }
        if (String(error).indexOf('[auth/too-many-requests]') >= 0) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: "Thiết bị của bạn đang tạm thời bị chặn vì gửi quá nhiều yêu cầu lên hệ thống!\nVui lòng thử lại sau!",
                bottomOffset: 20
            });
        }
        return undefined;
    }
}

async function onSendOTPbyEmail(email) {
    onDismissKeyboard();
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
    onDismissKeyboard();
    var response = await onAxiosPost('user/verifyResetPasswordCode', { email: email, otp: otp }, 'json', true)
    if (response) {
        return true;
    } else {
        return false;
    }
}

export { onSendOTPbyEmail, onSendOTPbyPhoneNumber, onVerifyOTPbyEmail }